import { TemplateData } from './types';

interface VerificationTemplateData extends TemplateData {
  verificationLink: string;
  username: string;
}

export const verificationEmail = {
  subject: 'Verify your FamilyHub email',
  template: ({ verificationLink, username }: VerificationTemplateData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Welcome to FamilyHub!</h1>
      <p>Hi ${username},</p>
      <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; display: inline-block;">
          Verify Email Address
        </a>
      </div>
      <p>Or copy and paste this link in your browser:</p>
      <p style="color: #4b5563;">${verificationLink}</p>
      <p>This link will expire in 24 hours.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="color: #6b7280; font-size: 14px;">
        If you didn't create an account with FamilyHub, please ignore this email.
      </p>
    </div>
  `
};