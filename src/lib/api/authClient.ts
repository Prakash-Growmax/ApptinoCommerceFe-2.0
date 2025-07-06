import { getEnvironmentVariables } from '@config/environment';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

import { ApiError, AuthClientOptions } from '@/types/lib/api.types';

const { AUTH_URL } = getEnvironmentVariables();

export const createAuthClient = (
  options: AuthClientOptions = {}
): AxiosInstance => {
  const client = axios.create({
    baseURL: options.baseURL || AUTH_URL || '',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return client;
};

export const authClient = createAuthClient();

export const apiPost = async <T>({
  url,
  data,
  schema,
  config = {},
}: {
  url: string;
  data?: unknown;
  schema?: z.ZodType<T>;
  config?: AxiosRequestConfig;
}): Promise<T> => {
  try {
    const response = await authClient.post(url, data, config);
    if (schema) {
      return schema.parse(response.data);
    }
    return response.data as T;
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) {
      throw error;
    }
    throw {
      message: error instanceof Error ? error.message : 'Request failed',
      status: 500,
    } as ApiError;
  }
};
