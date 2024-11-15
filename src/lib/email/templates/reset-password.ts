import { TemplateData } from './types';

interface ResetPasswordTemplateData extends TemplateData {
  resetLink: string;
  username: string;
}

export const resetPassword = {
  subject: 'Reset your FamilyHub password',
  template: ({ resetLink, username }: ResetPasswordTemplateData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Reset Your Password</h1>
      <p>Hi ${username},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p>Or copy and paste this link in your browser:</p>
      <p style="color: #4b5563;">${resetLink}</p>
      <p>This link will expire in 1 hour.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="color: #6b7280; font-size: 14px;">
        If you didn't request a password reset, please ignore this email.
      </p>
    </div>
  `
};