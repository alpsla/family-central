import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

export default function VerifyPendingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('auth.checkYourEmail')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('auth.verificationEmailSent')}
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="text-blue-600 hover:text-blue-500 font-medium inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('auth.backToSignIn')}
          </button>
        </div>
      </div>
    </div>
  );
}