import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      addVerification: (email, token, userId) => set((state) => ({
        pendingVerifications: {
          ...state.pendingVerifications,
          [email]: {
            token,
            userId,
            expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          },
        },
      })),
      removeVerification: (email) => set((state) => {
        const { [email]: _, ...rest } = state.pendingVerifications;
        return { pendingVerifications: rest };
      }),
      getVerification: (email) => {
        const verification = get().pendingVerifications[email];
        if (!verification || verification.expires < Date.now()) {
          get().removeVerification(email);
          return null;
        }
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