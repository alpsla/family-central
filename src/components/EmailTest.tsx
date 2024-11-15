import React, { useState } from 'react';
import { emailService } from '../lib/email/service';
import { logger } from '../lib/utils/logger';

export default function EmailTest() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [messageId, setMessageId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    setMessageId('');

    try {
      logger.info('Starting email test', { data: { recipient: email } });

      const result = await emailService.sendEmail({
        to: email,
        subject: 'FamilyHub Email Test',
        html: `
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
      });

      setStatus('success');
      setMessageId(result.messageId || '');
      logger.success('Test email sent successfully', { data: { messageId: result.messageId } });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send email';
      
      logger.error('Test email failed', { 
        data: { error: errorMessage }
      });
      
      setError(errorMessage);
      setStatus('error');
    }
  };

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
      <h3 className="font-bold mb-4">Test Email Service</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter test email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            status === 'sending'
              ? 'bg-gray-400'
              : status === 'success'
              ? 'bg-green-500'
              : status === 'error'
              ? 'bg-red-500'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {status === 'sending'
            ? 'Sending...'
            : status === 'success'
            ? 'Sent!'
            : status === 'error'
            ? 'Try Again'
            : 'Send Test Email'}
        </button>

        {status === 'success' && messageId && (
          <p className="text-sm text-green-600">
            Email sent successfully! Message ID: {messageId}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}