import { apiPost } from '@lib/api/client';

import {
  CheckUserNameRequestType,
  CheckUserNameResponseType,
  LoginRequestSchemaType,
  LoginResponseSchemaType,
} from '../schemas/auth.schemas';

// Fixed: consistent PascalCase naming
export const checkUserName = async (
  body: CheckUserNameRequestType
): Promise<CheckUserNameResponseType> => {
  const response = await apiPost<CheckUserNameResponseType>({
    url: '/auth/auth/CheckUserName',
    data: body,
  });
  return response;
};

// Fixed: consistent camelCase naming
export const login = async (
  body: LoginRequestSchemaType
): Promise<LoginResponseSchemaType> => {
  const response = await apiPost<LoginResponseSchemaType>({
    url: '/auth/auth/loginNew',
    data: body,
  });
  const accessToken = response?.tokens?.accessToken;
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
  return response;
};

// Add other auth API functions that are referenced in your queries
export const getCurrentUser = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('No auth token found');
  }
  if (token) {
    return true;
  }
};
export const getTenantIdFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.tenantId || payload.tid; // 'tid' is used in Azure AD tokens
  } catch (e) {
    console.error('Invalid token', e);
    return null;
  }
};

export const logout = async (): Promise<boolean> => {
  // Implement logout logic
  localStorage.removeItem('accessToken');
  return true;

  // Optional: call logout API endpoint
  // await apiPost({ url: '/auth/logout' });
};

export const getUsers = async (filters?: {
  search?: string;
  limit?: number;
}) => {
  // Implement this function based on your API
  const response = await apiPost({
    url: '/users',
    data: filters,
  });
  return response;
};
