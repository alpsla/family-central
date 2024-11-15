import { TemplateData } from './types';

export const testEmail = {
  subject: 'FamilyHub Email Test',
  template: () => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Welcome to FamilyHub!</h1>
      <p>This is a test email to verify our email service integration.</p>
      <p>If you received this email, the integration is working correctly!</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="color: #6b7280; font-size: 14px;">
        Sent from FamilyHub Email Service
      </p>
    </div>
  `
};