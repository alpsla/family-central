import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { useVerificationStore } from '../../lib/store/verification';
import { logger } from '../../lib/utils/logger';
import { urlUtils } from '../../lib/utils/url';

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        logger.info('Starting email verification process');

        // Parse and validate URL parameters
        const { token, email } = urlUtils.parseVerificationParams(searchParams);

        if (!token || !email) {
          const error = 'Missing verification parameters';
          logger.error(error, { 
            data: { hasToken: !!token, hasEmail: !!email } 
          });
          setError(error);
          setVerificationStatus('error');
          return;
        }

        // Get verification from store
        const decodedEmail = decodeURIComponent(email);
        const verification = useVerificationStore.getState().getVerification(decodedEmail);
        
        if (!verification) {
          const error = 'No verification found';
          logger.error(error, { data: { email: decodedEmail } });
          setError(error);
          setVerificationStatus('error');
          return;
        }

        if (verification.token !== token) {
          const error = 'Invalid verification token';
          logger.error(error, { 
            data: { 
              email: decodedEmail,
              expectedToken: verification.token.slice(0, 8) + '...',
              receivedToken: token.slice(0, 8) + '...'
            } 
          });
          setError(error);
          setVerificationStatus('error');
          return;
        }

        // Update user verification status
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map((user: any) => {
          if (user.id === verification.userId) {
            logger.info('Updating user verification status', { 
              data: { userId: user.id, email: decodedEmail } 
            });
            return { ...user, emailVerified: true };
          }
          return user;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Remove verification token
        useVerificationStore.getState().removeVerification(decodedEmail);
        logger.info('Removed verification token', { data: { email: decodedEmail } });

        // Show success and redirect
        setVerificationStatus('success');
        logger.success('Email verification successful', { data: { email: decodedEmail } });

        // Redirect to auth page after delay
        setTimeout(() => {
          logger.info('Redirecting to auth page');
          navigate('/auth', { replace: true });
        }, 3000);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Email verification failed', { data: { error: errorMessage } });
        setError(errorMessage);
        setVerificationStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {verificationStatus === 'loading' && (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <Loader className="h-6 w-6 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('auth.verifyingEmail')}
              </h2>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('auth.emailVerified')}
              </h2>
              <p className="text-gray-600">
                {t('auth.redirecting')}
              </p>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('auth.verificationFailed')}
              </h2>
              <p className="text-gray-600 mb-2">
                {t('auth.verificationFailedDescription')}
              </p>
              {error && (
                <p className="text-sm text-red-600 mb-4">
                  {error}
                </p>
              )}
              <button
                onClick={() => navigate('/auth')}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                {t('auth.backToSignIn')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}