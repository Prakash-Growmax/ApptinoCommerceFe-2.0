import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useQueryClient } from '@tanstack/react-query';

import { login as apiLogin, logout as apiLogout } from '../api/authApi';
import { authKeys, useUserQuery } from '../api/queries';
import { LoginCredentials, User } from '../types/auth.types';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // Get user data from query (now using correct v5 syntax)
  const { data: user, isLoading, error: userError, refetch } = useUserQuery();

  const isAuthenticated = !!user;

  // Login handler
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      try {
        setError(null);
        await apiLogin(credentials);

        // Invalidate user query to refetch user data
        await queryClient.invalidateQueries({
          queryKey: authKeys.user(),
        });

        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t('auth.errors.loginFailed')
        );
        return false;
      }
    },
    [queryClient, t]
  );

  // Logout handler
  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiLogout();

      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all });
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, [queryClient]);

  // Set error from user query if exists
  useEffect(() => {
    if (userError) {
      setError(
        userError instanceof Error
          ? userError.message
          : t('auth.errors.userDataFailed')
      );
    }
  }, [userError, t]);

  return {
    user: user ?? null,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
};
