import { logger } from '../utils/logger';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<{ success: true }> => {
  try {
    // In production, use Netlify Forms to handle email
    if (import.meta.env.PROD) {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'form-name': 'contact',
          email: options.to,
          subject: options.subject,
          message: options.html,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
    } else {
      // In development, log the email
      logger.info('Email would be sent in production', {
        data: {
          to: options.to,
          subject: options.subject,
          html: options.html.substring(0, 100) + '...',
        },
      });
    }

    return { success: true };
  } catch (error) {
    logger.error('Failed to send email', { data: error });
    throw error;
  }
};