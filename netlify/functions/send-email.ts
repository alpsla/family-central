import { Handler } from '@netlify/functions';
import { getSecrets } from '@netlify/functions';
import sgMail from '@sendgrid/mail';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // Get SendGrid API key from environment variables
    const { SENDGRID_API_KEY } = await getSecrets();
    
    if (!SENDGRID_API_KEY) {
      throw new Error('Missing SendGrid API key');
    }

    // Initialize SendGrid
    sgMail.setApiKey(SENDGRID_API_KEY);

    // Parse request body
    const payload: EmailPayload = JSON.parse(event.body || '{}');
    const { to, subject, html } = payload;

    // Validate required fields
    if (!to || !subject || !html) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Send email using SendGrid
    await sgMail.send({
      from: 'noreply@familycentral.io',
      to,
      subject,
      html,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true }
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
}

export { handler };