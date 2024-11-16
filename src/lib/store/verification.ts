import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logger } from '../utils/logger';

interface VerificationState {
  pendingVerifications: Record<string, {
    token: string;
    expires: number;
    userId: string;
  }>;
  addVerification: (email: string, token: string, userId: string) => void;
  removeVerification: (email: string) => void;
  getVerification: (email: string) => { token: string; expires: number; userId: string } | null;
}

export const useVerificationStore = create<VerificationState>()(
  persist(
    (set, get) => ({
      pendingVerifications: {},
      addVerification: (email, token, userId) => {
        logger.info('Adding verification', { 
          data: { 
            email,
            userId,
            tokenPreview: token.slice(0, 8) + '...'
          }
        });
        
        set((state) => ({
          pendingVerifications: {
            ...state.pendingVerifications,
            [email]: {
              token,
              userId,
              expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            },
          },
        }));
      },
      removeVerification: (email) => {
        logger.info('Removing verification', { data: { email } });
        set((state) => {
          const { [email]: _, ...rest } = state.pendingVerifications;
          return { pendingVerifications: rest };
        });
      },
      getVerification: (email) => {
        const verification = get().pendingVerifications[email];
        
        if (!verification) {
          logger.info('No verification found', { data: { email } });
          return null;
        }
        
        if (verification.expires < Date.now()) {
          logger.info('Verification expired', { data: { email } });
          get().removeVerification(email);
          return null;
        }
        
        logger.info('Retrieved verification', { 
          data: { 
            email,
            userId: verification.userId,
            expires: new Date(verification.expires).toISOString()
          }
        });
        
        return verification;
      },
    }),
    {
      name: 'verification-storage',
      partialize: (state) => ({
        pendingVerifications: state.pendingVerifications,
      }),
    }
  )
);