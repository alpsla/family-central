import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '../auth/types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      setToken: (token: string | null) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
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