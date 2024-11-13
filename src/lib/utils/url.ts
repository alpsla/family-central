// URL utility functions for consistent URL handling across the application
import { logger } from './logger';

export const urlUtils = {
  getBaseUrl(): string {
    // Use environment variable if available, fallback to window.location.origin
    const url = import.meta.env.VITE_APP_URL || window.location.origin;
    
    logger.info('Base URL determined', { 
      data: { 
        url,
        environment: import.meta.env.PROD ? 'production' : 'development'
      }
    });
    
    return url;
  },

  createVerificationUrl(token: string, email: string): string {
    const baseUrl = this.getBaseUrl();
    const verificationUrl = `${baseUrl}/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;
    
    logger.info('Created verification URL', { 
      data: { 
        url: verificationUrl,
        email 
      }
    });
    
    return verificationUrl;
  },

  parseVerificationParams(searchParams: URLSearchParams): { token: string | null; email: string | null } {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    logger.info('Parsing verification parameters', { 
      data: { 
        hasToken: !!token,
        hasEmail: !!email
      }
    });
    
    return { token, email };
  }
};