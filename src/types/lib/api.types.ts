export interface ApiError {
  message: string;
  code?: string | undefined;
  status: number;
}

export interface ApiErrorResponse {
  message?: string;
  code?: string;
  error?: string;
  details?: string;
}

export interface ApiClientOptions {
  baseURL?: string | undefined;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}
