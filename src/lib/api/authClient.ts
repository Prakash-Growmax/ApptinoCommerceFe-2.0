import { getEnvironmentVariables } from '@config/environment';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { z } from 'zod';

import { ApiError, AuthClientOptions } from '@/types/lib/api.types';
import { getErrorMessage } from '@/utils/errorMessages';

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

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const apiError: ApiError = {
        message: 'An unexpected error occurred',
        status: 500,
        code: 'UNKNOWN_ERROR',
      };

      if (error.response) {
        // Server responded with error status
        apiError.status = error.response.status;
        
        // Extract error details from response
        const responseData = error.response.data as any;
        
        // Debug logging
        if (process.env.NODE_ENV === 'development') {
          console.log('[Auth Client] Response data:', responseData);
        }
        
        // Try to extract error message from various possible response formats
        if (responseData) {
          if (typeof responseData === 'string') {
            apiError.message = responseData;
          } else if (responseData.message) {
            apiError.message = responseData.message;
          } else if (responseData.error) {
            apiError.message = responseData.error;
          } else if (responseData.errors && Array.isArray(responseData.errors)) {
            apiError.message = responseData.errors[0]?.message || responseData.errors[0];
          }
          
          // Extract error code if available
          if (responseData.code) {
            apiError.code = responseData.code;
          } else if (responseData.errorCode) {
            apiError.code = responseData.errorCode;
          }
        }
        
        // Transform to user-friendly message
        // Pass the original extracted message for proper mapping
        const userFriendlyMessage = getErrorMessage({
          message: apiError.message,
          status: apiError.status,
          code: apiError.code
        }, 'auth');
        apiError.message = userFriendlyMessage;
      } else if (error.request) {
        // Request was made but no response received
        apiError.status = 0;
        apiError.code = 'NETWORK_ERROR';
        apiError.message = getErrorMessage(error, 'auth');
      } else {
        // Something else happened
        apiError.message = getErrorMessage(error, 'auth');
      }

      return Promise.reject(apiError);
    }
  );

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
    // The error is already transformed by the interceptor
    throw error;
  }
};
