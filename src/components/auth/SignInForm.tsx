import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Github } from 'lucide-react';
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

  const handleLogin = () => {
    try {
      logger.info('Initiating email login');
      netlifyAuth.login();
    } catch (err) {
      logger.error('Login failed', { data: err });
      setError(t('auth.loginFailed'));
    }
  };

  const handleGitHubLogin = () => {
    try {
      logger.info('Initiating GitHub login');
      netlifyAuth.login('github');
    } catch (err) {
      logger.error('GitHub login failed', { data: err });
      setError(t('auth.githubLoginFailed'));
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
        onClick={handleGitHubLogin}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Github className="h-5 w-5" />
        {t('auth.continueWithGitHub')}
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

      <button
        onClick={handleLogin}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {t('auth.signIn')}
      </button>
    </div>
  );
}