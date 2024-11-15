import { TemplateData } from './types';

interface WelcomeTemplateData extends TemplateData {
  username: string;
}

export const welcomeEmail = {
  subject: 'Welcome to FamilyHub!',
  template: ({ username }: WelcomeTemplateData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Welcome to FamilyHub!</h1>
      <p>Hi ${username},</p>
      <p>Thank you for joining FamilyHub! We're excited to help you organize and connect with your family.</p>
      <div style="margin: 30px 0;">
        <h2 style="color: #1e40af;">Getting Started</h2>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin: 10px 0;">✨ Complete your family profile</li>
          <li style="margin: 10px 0;">📅 Set up your first family calendar</li>
          <li style="margin: 10px 0;">👥 Invite family members</li>
        </ul>
      </div>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="color: #6b7280; font-size: 14px;">
        Need help? Reply to this email or visit our support center.
      </p>
    </div>
  `
};