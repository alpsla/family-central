import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Users } from 'lucide-react';
import { useAuthStore } from '../../lib/store/auth';
import { logger } from '../../lib/utils/logger';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  familyName: z.string().min(2, 'Family name must be at least 2 characters'),
  email: z.string().email(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof schema>;

export default function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const password = watch('password', '');
  const passwordRequirements = [
    { regex: /.{8,}/, text: t('auth.passwordRequirements.minLength') },
    { regex: /[A-Z]/, text: t('auth.passwordRequirements.uppercase') },
    { regex: /[a-z]/, text: t('auth.passwordRequirements.lowercase') },
    { regex: /[0-9]/, text: t('auth.passwordRequirements.number') },
    { regex: /[^A-Za-z0-9]/, text: t('auth.passwordRequirements.special') },
  ];

  const onSubmit = async (data: SignUpFormData) => {
    try {
      logger.info('Starting sign-up process', { data: { email: data.email, name: data.name } });

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.some((user: any) => user.email === data.email);

      if (userExists) {
        logger.warn('Sign-up failed: Email already exists', { data: { email: data.email } });
        setError('email', {
          type: 'manual',
          message: 'Email already registered'
        });
        return;
      }

      // Create new user (auto-verified in development)
      const newUser = {
        id: crypto.randomUUID(),
        email: data.email,
        name: data.name,
        familyName: data.familyName,
        password: data.password,
        emailVerified: true, // Auto-verify in development
        createdAt: new Date().toISOString(),
      };

      // Store user
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      logger.success('User created and stored successfully');

      // Generate JWT-like token
      const token = btoa(JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      }));

      // Update auth store
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setToken(token);

      // Navigate to home page
      logger.info('Redirecting to home page');
      navigate('/', { replace: true });
    } catch (error) {
      logger.error('Sign-up process failed', { data: { error } });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t('auth.name')}
        </label>
        <div className="mt-1 relative">
          <input
            id="name"
            {...register('name')}
            type="text"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="familyName" className="block text-sm font-medium text-gray-700">
          {t('auth.familyName')}
        </label>
        <div className="mt-1 relative">
          <input
            id="familyName"
            {...register('familyName')}
            type="text"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.familyName && (
          <p className="mt-1 text-sm text-red-600">{errors.familyName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('auth.email')}
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            {...register('email')}
            type="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message || t('validation.email')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {t('auth.password')}
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            {...register('password')}
            type="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
        
        <div className="mt-2 space-y-2">
          {passwordRequirements.map((req, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-sm"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  req.regex.test(password) ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span className={req.regex.test(password) ? 'text-green-600' : 'text-gray-500'}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          {t('auth.confirmPassword')}
        </label>
        <div className="mt-1 relative">
          <input
            id="confirmPassword"
            {...register('confirmPassword')}
            type="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? t('common.loading') : t('auth.signUp')}
        </button>
      </div>
    </form>
  );
}