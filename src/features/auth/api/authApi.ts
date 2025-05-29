import { apiDelete, apiGet, apiPost } from '@lib/api/client';

import {
  AuthResponse,
  CheckUserNameRequestType,
  LoginCredentials,
  Registration,
  User,
  authResponseSchema,
  checkUserNameResponseType,
  userSchema,
} from '../types/auth.types';

export const CheckUserName = async (
  body: CheckUserNameRequestType
): Promise<checkUserNameResponseType> => {
  const response = await apiPost<checkUserNameResponseType>({
    url: '/auth/auth/CheckUserName',
    data: body,
  });
  return response;
};

// -------------------------------------------------
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiPost<AuthResponse>({
    url: '/auth/login',
    data: credentials,
    schema: authResponseSchema,
  });

  // Store tokens
  localStorage.setItem('auth_token', response.token);
  if (response.refreshToken) {
    localStorage.setItem('refresh_token', response.refreshToken);
  }

  return response;
};

/**
 * Register new user
 */
export const register = async (data: Registration): Promise<AuthResponse> => {
  const response = await apiPost<AuthResponse>({
    url: '/auth/register',
    data,
    schema: authResponseSchema,
  });

  // Store tokens
  localStorage.setItem('auth_token', response.token);
  if (response.refreshToken) {
    localStorage.setItem('refresh_token', response.refreshToken);
  }

  return response;
};
export const checkUser = async (data: Registration): Promise<AuthResponse> => {
  const authUrl = import.meta.env.VITE_AUTH_URL;

  // Optional: Ensure there's a trailing slash if needed
  const url = authUrl.endsWith('/')
    ? `${authUrl}auth/CheckUserName`
    : `${authUrl}/auth/CheckUserName`;

  const response = await apiPost<AuthResponse>({
    url,
    data,
  });

  return response;
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<User> => {
  return await apiGet<User>({
    url: '/auth/me',
    schema: userSchema,
  });
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    // Call logout endpoint to invalidate token on the backend
    await apiDelete({
      url: '/auth/logout',
    });
  } finally {
    // Always clean up local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }
};

/**
 * Refresh authentication token
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await apiPost<AuthResponse>({
    url: '/auth/refresh-token',
    data: { refreshToken },
    schema: authResponseSchema,
  });

  localStorage.setItem('auth_token', response.token);
  if (response.refreshToken) {
    localStorage.setItem('refresh_token', response.refreshToken);
  }

  return response;
};
