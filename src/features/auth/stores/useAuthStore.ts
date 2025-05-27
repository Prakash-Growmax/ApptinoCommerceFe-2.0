import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { User } from '../types/auth.types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    set => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: user => set({ user }, false, 'setUser'),
      setLoading: isLoading => set({ isLoading }, false, 'setLoading'),
      setError: error => set({ error }, false, 'setError'),
      clearAuth: () =>
        set(
          {
            user: null,
            isLoading: false,
            error: null,
          },
          false,
          'clearAuth'
        ),
    }),
    { name: 'AuthStore' }
  )
);
