import { apiPost } from '@lib/api/client';

import {
  CheckUserNameRequestType,
  LoginRequestSchemaType,
  LoginResponseSchemaType,
  checkUserNameResponseType,
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
export const Login = async (
  body: LoginRequestSchemaType
): Promise<LoginResponseSchemaType> => {
  const response = await apiPost<LoginResponseSchemaType>({
    url: '/auth/auth/loginNew',
    data: body,
  });
  return response;
};
