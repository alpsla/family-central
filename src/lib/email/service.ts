import { logger } from '../utils/logger';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  message?: string;
}

export const emailService = {
  async sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string }> {
    try {
      logger.info('Preparing to send email', { 
        data: { 
          to: options.to,
          subject: options.subject
        }
      });

      // In development, simulate email sending
      if (!import.meta.env.PROD) {
        logger.info('Development mode: Simulating email send', {
          data: {
            to: options.to,
            subject: options.subject,
            html: options.html.substring(0, 100) + '...'
          }
        });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
          success: true,
          messageId: `dev-${Date.now()}`
        };
      }

      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      const data: EmailResponse = await response.json();
      
      if (!response.ok || !data.success) {
        logger.error('Email service responded with error', { 
          data: { 
            status: response.status,
            statusText: response.statusText,
            error: data.error,
            message: data.message
          }
        });
        throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
      }

      logger.success('Email sent successfully', { 
        data: { 
          messageId: data.messageId
        }
      });

      return { 
        success: true,
        messageId: data.messageId
      };
    } catch (error) {
      logger.error('Failed to send email', { 
        data: { 
          error: error instanceof Error ? {
            message: error.message,
            stack: error.stack
          } : error
        }
      });
      throw error;
    }
  }
};