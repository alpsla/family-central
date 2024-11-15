import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { emailService } from '../../lib/email/service';
import { logger } from '../../lib/utils/logger';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email);

      if (user) {
        // Generate reset token
        const resetToken = crypto.randomUUID();
        const resetLink = `${window.location.origin}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

        await emailService.sendEmail({
          to: email,
          subject: t('auth.resetPassword'),
          html: `
            <p>${t('auth.resetPasswordEmail', { email })}</p>
            <p><a href="${resetLink}">${t('auth.resetPasswordLink')}</a></p>
          `
        });
      }

      // Always show success to prevent email enumeration
      setEmailSent(true);
    } catch (error) {
      logger.error('Failed to send reset email', { 
        data: error instanceof Error ? error.message : 'Unknown error'
      });
      setError(t('auth.resetPasswordError'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {!emailSent ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('auth.forgotPasswordTitle')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('auth.forgotPasswordDescription')}
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('auth.email')}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t('auth.resetPassword')}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center">
                <Mail className="mx-auto h-12 w-12 text-blue-600" />
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  {t('auth.checkYourEmail')}
                </h2>
                <p className="mt-2 text-gray-600">
                  {t('auth.resetEmailSent')}
                </p>
              </div>
            </>
          )}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/auth')}
              className="text-sm text-blue-600 hover:text-blue-500 inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('auth.backToSignIn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}