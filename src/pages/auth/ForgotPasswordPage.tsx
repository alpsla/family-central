// ... previous imports remain the same ...

const getBaseUrl = () => {
  // Use Netlify URL in production, local URL in development
  return import.meta.env.PROD 
    ? 'https://familycentral.netlify.app'
    : window.location.origin;
};

export default function ForgotPasswordPage() {
  // ... other code remains the same ...

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === data.email);

      if (user) {
        // Generate reset token
        const resetToken = crypto.randomUUID();
        const resetLink = `${getBaseUrl()}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(data.email)}`;

        // ... rest of the code remains the same ...
      }

      // Always show success to prevent email enumeration
      setEmailSent(true);
    } catch (error) {
      console.error('Failed to send reset email:', error);
    }
  };

  // ... rest of the component remains the same ...
}