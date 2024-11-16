import React, { useState } from 'react';
import { emailService } from '../lib/email/service';
import { logger } from '../lib/utils/logger';

export default function EmailTest() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  // Only show in development
  if (import.meta.env.PROD) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setStatus('sending');
      setError('');

      await emailService.sendEmail({
        to: email,
        subject: 'Test Email from FamilyHub',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Test Email</h1>
            <p>This is a test email from FamilyHub.</p>
            <p>If you received this email, the email service is working correctly!</p>
          </div>
        `
      });

      setStatus('success');
      logger.success('Test email sent successfully', { data: { email } });
    } catch (error) {
      setStatus('error');
      setError(error instanceof Error ? error.message : 'Failed to send test email');
      logger.error('Failed to send test email', { data: { error } });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-sm">
      <h3 className="font-bold mb-2">Email Test Tool</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter test email"
            className="w-full px-3 py-2 bg-gray-700 rounded text-white placeholder-gray-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Test Email'}
        </button>
        {status === 'success' && (
          <p className="text-green-400 text-sm">Email sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
}