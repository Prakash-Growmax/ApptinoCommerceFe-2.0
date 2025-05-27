// src/lib/api/client.ts
import { getEnvironmentVariables } from '@config/environment';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

// Get API URL from environment variables
const { API_URL } = getEnvironmentVariables();

/**
 * Base API error type
 */
export interface ApiError {
  message: string;
  code?: string | undefined;
  status: number;
}

/**
 * API response error structure
 */
interface ApiErrorResponse {
  message?: string;
  code?: string;
  error?: string;
  details?: string;
}

/**
 * API client options
 */
export interface ApiClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Creates a configured Axios instance for API requests
 */
export const createApiClient = (
  options: ApiClientOptions = {}
): AxiosInstance => {
  const client = axios.create({
    baseURL: options.baseURL || API_URL,
    timeout: options.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    config => {
      // Get token from localStorage or another storage mechanism
      const token = localStorage.getItem('auth_token');

      // If token exists, add it to the request headers
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error)
  );

  // Response interceptor
  client.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiErrorResponse>) => {
      // Handle different error responses
      const status = error.response?.status || 500;
      const responseData = error.response?.data;

      // Handle 401 Unauthorized - redirect to login or refresh token
      if (status === 401) {
        // Clear authentication
        localStorage.removeItem('auth_token');

        // Redirect to login page if not a refresh token request
        const isRefreshTokenRequest =
          error.config?.url?.includes('refresh-token');
        if (!isRefreshTokenRequest) {
          window.location.href = '/auth/login';
        }
      }

      // Extract error message with fallbacks
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

      // Format error for easier consumption
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

/**
 * Default API client instance
 */
export const apiClient = createApiClient();

/**
 * Typed wrapper functions for API requests
 */

/**
 * Make a GET request with type validation
 */
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
    // Re-throw ApiError or convert unknown errors
    if (error && typeof error === 'object' && 'status' in error) {
      throw error; // Already an ApiError
    }

    throw {
      message: error instanceof Error ? error.message : 'Request failed',
      status: 500,
    } as ApiError;
  }
};

/**
 * Make a POST request with type validation
 */
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

/**
 * Make a PUT request with type validation
 */
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

/**
 * Make a PATCH request with type validation
 */
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

/**
 * Make a DELETE request with type validation
 */
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
