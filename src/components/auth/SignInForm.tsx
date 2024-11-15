import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock } from 'lucide-react';
import { netlifyAuth } from '../../lib/auth/netlifyIdentity';
import { logger } from '../../lib/utils/logger';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export default function SignInForm() {
  const { t } = useTranslation();
  const [error, setError] = useState<string>('');

  const handleEmailLogin = () => {
    try {
      logger.info('Initiating email login');
      netlifyAuth.login();
    } catch (err) {
      logger.error('Login failed', { data: err });
      setError(t('auth.emailLoginFailed'));
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-sm text-red-600 text-center">
          {error}
        </div>
      )}

      <button
        onClick={handleEmailLogin}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Mail className="h-5 w-5" />
        {t('auth.continueWithEmail')}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            {t('auth.orContinueWith')}
          </span>
        </div>
      </div>

      <div className="mt-6 text-center text-sm">
        <a href="/auth?mode=signup" className="text-blue-600 hover:text-blue-500">
          {t('auth.noAccount')}
        </a>
      </div>
    </div>
  );
}