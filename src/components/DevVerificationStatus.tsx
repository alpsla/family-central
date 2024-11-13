import React from 'react';
import { useAuthStore } from '../lib/store/auth';
import { useVerificationStore } from '../lib/store/verification';

export default function DevVerificationStatus() {
  const { user } = useAuthStore();
  const { pendingVerifications } = useVerificationStore();

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-sm text-sm font-mono">
      <h3 className="font-bold mb-2">Dev Verification Status</h3>
      <div className="space-y-2">
        <div>
          <strong>Current User:</strong>
          <pre className="mt-1 text-xs">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <div>
          <strong>Pending Verifications:</strong>
          <pre className="mt-1 text-xs">
            {JSON.stringify(pendingVerifications, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}