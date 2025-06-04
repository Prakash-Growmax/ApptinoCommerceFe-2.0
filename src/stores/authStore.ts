import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AuthActions, AuthState, TokenPayload } from '@/types/auth.types';

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      set => ({
        // State
        payload: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: true, // Start as loading
        error: null,

        // Actions
        setAuth: (
          payload: TokenPayload,
          accessToken: string,
          refreshToken: string
        ) => {
          set({
            payload,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        },
        logout: () => {
          set({
            payload: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Clear any other persisted data
          localStorage.removeItem('lastRoute');
        },

        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },

        setError: (error: string | null) => {
          set({ error, isLoading: false });
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'auth-storage',
        partialize: state => ({
          payload: state.payload,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => state => {
          if (state) {
            state.setLoading(false);
          }
        },
      }
    ),
    { name: 'AuthStore' }
  )
);
