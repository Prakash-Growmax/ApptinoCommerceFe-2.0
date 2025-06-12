import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AppStore } from '@/types/app.types';
import { TokenPayload } from '@/types/auth.types';

const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      //State,
      accessToken: null,
      refreshToken: null,
      payload: null,
      isAuthenticated: false,
      isAuthLoading: true,
      isAppLoading: true,
      isError: false,
      hasHydrated: false,

      //Actions,
      loginAction: (
        accessToken: string,
        refreshToken: string,
        payload: TokenPayload
      ) => {
        set({
          accessToken,
          refreshToken,
          payload: payload,
          isAuthenticated: true,
          isAuthLoading: false,
          isAppLoading: false,
          isError: false,
        });
      },

      logoutAction: () => {
        set({
          accessToken: null,
          refreshToken: null,
          payload: null,
          isAuthenticated: false,
          isAuthLoading: false,
          isAppLoading: false,
          isError: false,
        });
      },

      setAppLoadingAction: (loading: boolean) => {
        set({ isAppLoading: loading });
      },
      setAuthLoadingAction: (loading: boolean) => {
        set({ isAuthLoading: loading });
      },

      setErrorAction: (error: boolean) => {
        set({ isError: error });
      },
      setHydrated: () => {
        set({ hasHydrated: true });
      },

      getAuthHeaderAction: () => {
        const accessToken = get().accessToken;
        const isValid = get().isTokenValidAction();
        return accessToken && isValid
          ? { Authorization: `Bearer ${accessToken}` }
          : {};
      },

      initializeAuthAction: () => {
        const state = get();

        if (!state.hasHydrated) {
          console.error('Store not hydrated yet, waiting...');
          return;
        }

        set({
          isAuthLoading: true,
          isAppLoading: true,
        });
        const { accessToken, refreshToken, payload } = get();
        if (accessToken && payload && get().isTokenValidAction()) {
          set({
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isAuthLoading: false,
            isAppLoading: false,
            isError: false,
          });
        } else {
          set({
            accessToken: null,
            refreshToken: null,
            payload: null,
            isAuthenticated: false,
            isAuthLoading: false,
            isAppLoading: false,
            isError: false,
          });
        }
      },

      isTokenValidAction: () => {
        const { payload } = get();
        if (!payload?.exp) return false;
        const bufferSeconds = 5;
        return Date.now() < (payload.exp - bufferSeconds) * 1000;
      },
      refreshTokensAction: (
        newAccessToken: string,
        newRefreshToken: string
      ) => {
        set({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        payload: state.payload,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('An error happened during hydration', error);
          } else if (state) {
            state.setHydrated();
            state.initializeAuthAction();
          }
        };
      },
    }
  )
);

export default useAppStore;
