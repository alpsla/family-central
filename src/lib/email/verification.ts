import { sendEmail } from './sendgrid';
import { emailTemplates } from './templates';
import { useVerificationStore } from '../store/verification';
import { logger } from '../utils/logger';
import { urlUtils } from '../utils/url';

export const sendVerificationEmail = async (email: string, userId: string) => {
  try {
    logger.info('Starting verification email process', { 
      data: { email, userId } 
    });

    // Generate verification token
    const token = crypto.randomUUID();
    logger.info('Generated verification token', { 
      data: { 
        token: token.slice(0, 8) + '...',
        email 
      } 
    });
    
    // Create verification link with proper URL encoding
    const verificationLink = urlUtils.createVerificationUrl(token, email);
    
    // Store verification token
    useVerificationStore.getState().addVerification(email, token, userId);
    logger.info('Stored verification token', { data: { email } });

    // Get username from email
    const username = email.split('@')[0];
    
    // Generate email content
    const emailContent = emailTemplates.verifyEmail({
      verificationLink,
      username,
    });

    // Send the verification email (mocked in development)
    await sendEmail({
      to: email,
      ...emailContent,
    });

    logger.success('Verification email sent successfully', { data: { email } });
    return { success: true };
  } catch (error) {
    logger.error('Failed to send verification email', { data: { error, email } });
    throw error;
  }
};