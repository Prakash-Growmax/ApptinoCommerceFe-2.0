import { getEnvironmentVariables } from '@config/environment';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';

import { getRefreshToken } from '@/features/auth/api/authApi';
import useAppStore from '@/stores/appStore';
import {
  ApiClientOptions,
  ApiError,
  ApiErrorResponse,
} from '@/types/lib/api.types';

const { API_URL } = getEnvironmentVariables();

let refreshPromise: Promise<any> | null = null;

/**
 * Creates a configured Axios instance for API requests
 */
export const createApiClient = (
  options: ApiClientOptions = {}
): AxiosInstance => {
  const client = axios.create({
    baseURL: options.baseURL || API_URL || '',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const {
    accessToken,
    refreshToken,
    isTokenValidAction,
    refreshTokensAction,
    logoutAction,
  } = useAppStore.getState();

  client.interceptors.request.use(
    async config => {
      // If no tokens available, proceed without auth
      if (!accessToken || !refreshToken) {
        return config;
      }

      const isValid = isTokenValidAction();
      let bearerToken = accessToken;

      if (!isValid) {
        try {
          if (refreshPromise) {
            await refreshPromise;
            bearerToken = useAppStore.getState().accessToken || accessToken;
          } else {
            refreshPromise = getRefreshToken({ accessToken, refreshToken });
            const res = await refreshPromise;
            if (res?.tokens) {
              refreshTokensAction(
                res.tokens.accessToken,
                res.tokens.refreshToken
              );
              bearerToken = res.tokens.accessToken;
            } else {
              toast.error('Authentication failed!');
            }
          }
        } catch (error) {
          const { setErrorAction } = useAppStore.getState();
          setErrorAction(true);
          toast.error('Authentication failed!');
        } finally {
          refreshPromise = null;
        }
      }

      if (config.headers && bearerToken) {
        config.headers.Authorization = `Bearer ${bearerToken}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  client.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiErrorResponse>) => {
      const status = error.response?.status || 500;
      const responseData = error.response?.data;
      if (status === 401) {
        logoutAction();
      }

      let errorMessage = 'An unexpected error occurred';

      if (responseData) {
        errorMessage =
          responseData.message ||
          responseData.error ||
          responseData.details ||
          errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      const apiError: ApiError = {
        message: errorMessage,
        code: responseData?.code ?? undefined,
        status,
      };

      return Promise.reject(apiError);
    }
  );

  return client;
};

export const apiClient = createApiClient();

export const apiGet = async <T>({
  url,
  params,
  schema,
  config = {},
}: {
  url: string;
  params?: Record<string, unknown>;
  schema?: z.ZodType<T>;
  config?: AxiosRequestConfig;
}): Promise<T> => {
  try {
    const response = await apiClient.get(url, { ...config, params });

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
    const response = await apiClient.post(url, data, config);

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

export const apiPut = async <T>({
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
    const response = await apiClient.put(url, data, config);

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

export const apiPatch = async <T>({
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
    const response = await apiClient.patch(url, data, config);

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

export const apiDelete = async <T = void>({
  url,
  params,
  schema,
  config = {},
}: {
  url: string;
  params?: Record<string, unknown>;
  schema?: z.ZodType<T>;
  config?: AxiosRequestConfig;
}): Promise<T> => {
  try {
    const response = await apiClient.delete(url, { ...config, params });

    if (schema) {
      return schema.parse(response.data);
    }

    // For DELETE requests, often there's no response body
    return (response.data || undefined) as T;
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
