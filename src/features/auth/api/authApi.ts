import { apiPost } from '@/lib/api/authClient';
import { apiGet } from '@/lib/api/client';

import {
  CheckUserNameRequestType,
  CheckUserNameResponseType,
  LoginRequestSchemaType,
  LoginResponseSchemaType,
  RefreshTokenRequestSchemaType,
  RefreshTokenResponseSchemaType,
  LogoutRequestSchemaType,
  LogoutResponseSchemaType,
  GetCurrentUserResponseSchemaType,
  GetUsersResponseSchemaType,
  UserSchemaType,
} from '../schemas/auth.schemas';

// Fixed: consistent PascalCase naming
export const checkUserName = async (
  body: CheckUserNameRequestType
): Promise<CheckUserNameResponseType> => {
  const response = await apiPost<CheckUserNameResponseType>({
    url: '/CheckUserName',
    data: body,
  });
  return response;
};

// Fixed: consistent camelCase naming
export const login = async (
  body: LoginRequestSchemaType
): Promise<LoginResponseSchemaType> => {
  const response = await apiPost<LoginResponseSchemaType>({
    url: '/loginNew',
    data: body,
    config: {
      headers: {
        withCredentials: true,
      },
    },
  });
  return response;
};

export const getRefreshToken = async (
  body: RefreshTokenRequestSchemaType
): Promise<RefreshTokenResponseSchemaType> => {
  const response = await apiPost<RefreshTokenResponseSchemaType>({
    url: '/refreshToken',
    data: body,
  });
  return response;
};

export const logout = async (
  body: LogoutRequestSchemaType
): Promise<LogoutResponseSchemaType> => {
  const response = await apiPost<LogoutResponseSchemaType>({
    url: '/logout',
    data: body,
    config: {
      headers: {
        withCredentials: true,
      },
    },
  });
  return response;
};

export const getCurrentUser = async (): Promise<UserSchemaType> => {
  const response = await apiGet<GetCurrentUserResponseSchemaType>({
    url: '/user/current',
  });
  return response.user;
};

export const getUsers = async (filters?: {
  search?: string;
  limit?: number;
  page?: number;
}): Promise<GetUsersResponseSchemaType> => {
  const response = await apiGet<GetUsersResponseSchemaType>({
    url: '/users',
    params: filters as Record<string, unknown>,
  });
  return response;
};
