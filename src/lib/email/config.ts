interface EmailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    from: {
      name: string;
      address: string;
    };
    tls: {
      rejectUnauthorized: boolean;
    };
    pool: {
      maxConnections: number;
      maxMessages: number;
    };
  }
  
  export const emailConfig: EmailConfig = {
    host: 'smtppro.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.VITE_ZOHO_MAIL_USER || 'admin@familycentral.io',
      pass: import.meta.env.VITE_ZOHO_APP_PASSWORD || ''
    },
    from: {
      name: 'FamilyHub',
      address: 'admin@familycentral.io'
    },
    tls: {
      rejectUnauthorized: true
    },
    pool: {
      maxConnections: 5,
      maxMessages: 100
    }
  };