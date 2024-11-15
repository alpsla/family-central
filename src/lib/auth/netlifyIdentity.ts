import netlifyIdentity from 'netlify-identity-widget';
import { logger } from '../utils/logger';
import type { User } from './types';

export const initNetlifyIdentity = () => {
  try {
    logger.info('Initializing Netlify Identity');
    
    netlifyIdentity.init({
      locale: 'en',
      APIUrl: 'https://familycentral.io/.netlify/identity'
    });

    // Log user events in development
    netlifyIdentity.on('init', (user: User | null) => {
      logger.info('NetlifyIdentity initialized', { data: { user: user?.email } });
    });

    netlifyIdentity.on('login', (user: User) => {
      logger.success('User logged in', { data: { email: user.email } });
      // Close the modal after login
      netlifyIdentity.close();
      // Redirect after a short delay to ensure state is updated
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    });

    netlifyIdentity.on('logout', () => {
      logger.info('User logged out');
      netlifyIdentity.close();
      window.location.href = '/';
    });

    netlifyIdentity.on('error', (err: Error) => {
      logger.error('NetlifyIdentity error', { data: err });
    });

    // Handle email verification
    netlifyIdentity.on('login', (user: User) => {
      if (user.email_verified) {
        logger.success('Email verified', { data: { email: user.email } });
      }
    });
  } catch (error) {
    logger.error('Failed to initialize Netlify Identity', { data: error });
  }
};

export const netlifyAuth = {
  signup() {
    netlifyIdentity.open('signup');
  },
  login(provider?: 'github') {
    if (provider === 'github') {
      netlifyIdentity.open('login');
      const loginTab = document.querySelector('[data-provider="github"]');
      if (loginTab) {
        (loginTab as HTMLElement).click();
      }
    } else {
      netlifyIdentity.open('login');
    }
  },
  logout() {
    netlifyIdentity.logout();
  },
  getCurrentUser(): User | null {
    return netlifyIdentity.currentUser() as User | null;
  }
};