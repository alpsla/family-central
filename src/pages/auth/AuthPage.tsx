import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SignInForm from '../../components/auth/SignInForm';
import SignUpForm from '../../components/auth/SignUpForm';

export default function AuthPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsSignIn(false);
    }
  }, [searchParams]);

  const toggleMode = () => {
    const newMode = !isSignIn;
    setIsSignIn(newMode);
    navigate(`/auth${newMode ? '' : '?mode=signup'}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
              {isSignIn ? t('auth.signIn') : t('auth.signUp')}
            </h2>
          </div>

          {isSignIn ? <SignInForm /> : <SignUpForm />}

          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {isSignIn
                ? t('auth.noAccount')
                : t('auth.alreadyHaveAccount')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}