import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Users } from 'lucide-react';
import { netlifyAuth } from '../../lib/auth/netlifyIdentity';
import { useAuthStore } from '../../lib/store/auth';
import { logger } from '../../lib/utils/logger';

interface PasswordRequirement {
  regex: RegExp;
  label: string;
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { regex: /.{8,}/, label: 'auth.passwordRequirements.minLength' },
  { regex: /[A-Z]/, label: 'auth.passwordRequirements.uppercase' },
  { regex: /[a-z]/, label: 'auth.passwordRequirements.lowercase' },
  { regex: /[0-9]/, label: 'auth.passwordRequirements.number' },
  { regex: /[^A-Za-z0-9]/, label: 'auth.passwordRequirements.special' },
];

export default function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    familyName: ''
  });
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const validatePassword = (password: string) => {
    return PASSWORD_REQUIREMENTS.every(req => req.regex.test(password));
  };

  const getPasswordStrength = (password: string) => {
    return PASSWORD_REQUIREMENTS.filter(req => req.regex.test(password)).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('validation.passwordMatch'));
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(t('validation.passwordInvalid'));
      return;
    }

    setIsLoading(true);

    try {
      const user = await netlifyAuth.signup(formData.email, formData.password, {
        user_metadata: {
          full_name: formData.name,
          family_name: formData.familyName
        }
      });
      
      logger.success('Signup successful', { 
        data: { 
          email: formData.email,
          name: formData.name,
          familyName: formData.familyName
        }
      });

      // Set the user in the auth store
      setUser(user);
      
      // Navigate to home page
      navigate('/', { replace: true });
    } catch (err) {
      logger.error('Signup failed', { data: err });
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthPercentage = (passwordStrength / PASSWORD_REQUIREMENTS.length) * 100;
  const passwordsMatch = !formData.confirmPassword || formData.password === formData.confirmPassword;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t('auth.name')}
        </label>
        <div className="mt-1 relative">
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label htmlFor="familyName" className="block text-sm font-medium text-gray-700">
          {t('auth.familyName')}
        </label>
        <div className="mt-1 relative">
          <input
            id="familyName"
            type="text"
            value={formData.familyName}
            onChange={(e) => setFormData(prev => ({ ...prev, familyName: e.target.value }))}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('auth.email')}
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {t('auth.password')}
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            onFocus={() => setShowPasswordRequirements(true)}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {showPasswordRequirements && (
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  strengthPercentage >= 80 ? 'bg-green-500' :
                  strengthPercentage >= 60 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${strengthPercentage}%` }}
              />
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {PASSWORD_REQUIREMENTS.map((req, index) => (
                <li
                  key={index}
                  className={`flex items-center space-x-2 ${
                    req.regex.test(formData.password) ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  <span className="text-xs">
                    {req.regex.test(formData.password) ? '✓' : '○'}
                  </span>
                  <span>{t(req.label)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          {t('auth.confirmPassword')}
        </label>
        <div className="mt-1 relative">
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            required
            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              !passwordsMatch ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {(error || !passwordsMatch) && (
        <div className="text-sm text-red-600 text-center">
          {error || (formData.confirmPassword && t('validation.passwordMatch'))}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !passwordsMatch}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? t('common.loading') : t('auth.signUp')}
      </button>
    </form>
  );
}