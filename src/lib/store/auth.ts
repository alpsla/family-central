import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '../auth/types';
import { logger } from '../utils/logger';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user: User | null) => {
        logger.info('Setting user in auth store', { 
          data: { 
            userId: user?.id,
            isAuthenticated: !!user 
          }
        });
        set({ 
          user, 
          isAuthenticated: !!user,
          token: user ? crypto.randomUUID() : null
        });
      },
      setToken: (token: string | null) => set({ token }),
      logout: () => {
        logger.info('Logging out user');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);