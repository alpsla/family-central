// import { Handler } from '@netlify/functions';
// import nodemailer from 'nodemailer';
// import type { TransportOptions } from 'nodemailer';

// interface EmailPayload {
//   to: string;
//   subject: string;
//   html: string;
// }

// const handler: Handler = async (event) => {
//   // Set CORS headers
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Content-Type': 'application/json'
//   };

//   // Handle preflight requests
//   if (event.httpMethod === 'OPTIONS') {
//     return {
//       statusCode: 204,
//       headers,
//       body: ''
//     };
//   }

//   // Only allow POST requests
//   if (event.httpMethod !== 'POST') {
//     return {
//       statusCode: 405,
//       headers,
//       body: JSON.stringify({ error: 'Method Not Allowed' })
//     };
//   }

//   try {
//     // Get Zoho Mail credentials from environment variables
//     const ZOHO_MAIL_USER = process.env.ZOHO_MAIL_USER;
//     const ZOHO_APP_PASSWORD = process.env.ZOHO_APP_PASSWORD;
    
//     if (!ZOHO_MAIL_USER || !ZOHO_APP_PASSWORD) {
//       console.error('Missing Zoho credentials');
//       return {
//         statusCode: 500,
//         headers,
//         body: JSON.stringify({ 
//           success: false,
//           error: 'Missing Zoho Mail credentials' 
//         })
//       };
//     }

//     // Parse request body
//     let payload: EmailPayload;
//     try {
//       payload = JSON.parse(event.body || '{}');
//     } catch (e) {
//       console.error('Failed to parse JSON payload:', e);
//       return {
//         statusCode: 400,
//         headers,
//         body: JSON.stringify({ 
//           success: false,
//           error: 'Invalid JSON payload' 
//         })
//       };
//     }

//     const { to, subject, html } = payload;

//     // Validate required fields
//     if (!to || !subject || !html) {
//       console.error('Missing required fields');
//       return {
//         statusCode: 400,
//         headers,
//         body: JSON.stringify({ 
//           success: false,
//           error: 'Missing required fields' 
//         })
//       };
//     }

//     // Create Nodemailer transporter
//     const transportOptions: TransportOptions = {
//       host: 'smtppro.zoho.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: ZOHO_MAIL_USER,
//         pass: ZOHO_APP_PASSWORD
//       }
//     };

//     const transporter = nodemailer.createTransport(transportOptions);

//     // Verify transporter configuration
//     await transporter.verify();

//     // Send email
//     const info = await transporter.sendMail({
//       from: `"FamilyHub" <${ZOHO_MAIL_USER}>`,
//       to,
//       subject,
//       html
//     });

//     console.log('Email sent successfully', { messageId: info.messageId });
//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({
//         success: true,
//         messageId: info.messageId,
//         response: info.response
//       })
//     };

//   } catch (error) {
//     console.error('Error in email function:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';

//     return {
//       statusCode: 500,
//       headers,
//       body: JSON.stringify({
//         success: false,
//         error: 'Failed to send email',
//         message: errorMessage
//       })
//     };
//   }
// };

// export { handler };