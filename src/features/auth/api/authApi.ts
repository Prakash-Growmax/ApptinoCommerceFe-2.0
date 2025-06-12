import { apiPost } from '@/lib/api/authClient';

import {
  CheckUserNameRequestType,
  CheckUserNameResponseType,
  LoginRequestSchemaType,
  LoginResponseSchemaType,
  RefreshTokenRequestSchemaType,
  RefreshTokenResponseSchemaType,
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
