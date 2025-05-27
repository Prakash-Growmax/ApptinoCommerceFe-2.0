import { useQuery } from '@tanstack/react-query';
// Mutations also changed slightly in v5
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getCurrentUser } from './authApi';

/**
 * Auth-related query keys
 */
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

/**
 * Query hook for getting current user (FIXED for React Query v5)
 */
export const useUserQuery = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    // Only attempt to get user if there's a token
    enabled: !!localStorage.getItem('auth_token'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once
    // Don't refetch on window focus if there's no token
    refetchOnWindowFocus: !!localStorage.getItem('auth_token'),
  });
};

// If you have other queries, fix them similarly:
// OLD v4 syntax: useQuery(key, fn, options)
// NEW v5 syntax: useQuery({ queryKey: key, queryFn: fn, ...options })

// Example of other common query patterns in v5:
export const useUsersQuery = (filters?: {
  search?: string;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => getUsers(filters),
    enabled: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login, // Direct function reference
    onSuccess: data => {
      // Invalidate and refetch user query
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all });
      // Or reset all queries
      queryClient.clear();
    },
  });
};
