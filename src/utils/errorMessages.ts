// Import i18n when available - for now we'll use static messages
// import i18n from '@/lib/i18n/i18n';

export const ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'auth.invalid_credentials',
  USER_NOT_FOUND: 'auth.user_not_found',
  ACCOUNT_LOCKED: 'auth.account_locked',
  SESSION_EXPIRED: 'auth.session_expired',
  UNAUTHORIZED: 'auth.unauthorized',
  
  // Validation errors
  VALIDATION_ERROR: 'validation.error',
  INVALID_EMAIL: 'validation.invalid_email',
  INVALID_PASSWORD: 'validation.invalid_password',
  REQUIRED_FIELD: 'validation.required_field',
  
  // Network errors
  NETWORK_ERROR: 'network.error',
  TIMEOUT: 'network.timeout',
  CONNECTION_LOST: 'network.connection_lost',
  
  // Server errors
  INTERNAL_SERVER_ERROR: 'server.internal_error',
  SERVICE_UNAVAILABLE: 'server.unavailable',
  MAINTENANCE_MODE: 'server.maintenance',
  
  // Business logic errors
  INSUFFICIENT_PERMISSIONS: 'business.insufficient_permissions',
  RESOURCE_NOT_FOUND: 'business.resource_not_found',
  DUPLICATE_ENTRY: 'business.duplicate_entry',
  OPERATION_FAILED: 'business.operation_failed',
  
  // Generic errors
  UNKNOWN_ERROR: 'errors.unknown',
  DEFAULT_ERROR: 'errors.default'
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

export const errorMessages: Record<string, string> = {
  // Authentication errors
  'auth.invalid_credentials': 'Invalid email or password. Please try again.',
  'auth.user_not_found': 'User account not found. Please check your credentials.',
  'auth.account_locked': 'Your account has been locked. Please contact support.',
  'auth.session_expired': 'Your session has expired. Please log in again.',
  'auth.unauthorized': 'You are not authorized to perform this action.',
  
  // Validation errors
  'validation.error': 'Please check your input and try again.',
  'validation.invalid_email': 'Please enter a valid email address.',
  'validation.invalid_password': 'Password does not meet requirements.',
  'validation.required_field': 'This field is required.',
  
  // Network errors
  'network.error': 'Network connection error. Please check your internet connection.',
  'network.timeout': 'Request timed out. Please try again.',
  'network.connection_lost': 'Connection lost. Please check your network.',
  
  // Server errors
  'server.internal_error': 'Something went wrong on our end. Please try again later.',
  'server.unavailable': 'Service temporarily unavailable. Please try again later.',
  'server.maintenance': 'System is under maintenance. Please try again later.',
  
  // Business logic errors
  'business.insufficient_permissions': 'You do not have permission to perform this action.',
  'business.resource_not_found': 'The requested resource was not found.',
  'business.duplicate_entry': 'This entry already exists.',
  'business.operation_failed': 'Operation failed. Please try again.',
  
  // Generic errors
  'errors.unknown': 'An unexpected error occurred. Please try again.',
  'errors.default': 'Something went wrong. Please try again.'
};

// HTTP status code to error code mapping
export const httpStatusToErrorCode: Record<number, string> = {
  400: ERROR_CODES.VALIDATION_ERROR,
  401: ERROR_CODES.UNAUTHORIZED,
  403: ERROR_CODES.INSUFFICIENT_PERMISSIONS,
  404: ERROR_CODES.RESOURCE_NOT_FOUND,
  408: ERROR_CODES.TIMEOUT,
  409: ERROR_CODES.DUPLICATE_ENTRY,
  500: ERROR_CODES.INTERNAL_SERVER_ERROR,
  502: ERROR_CODES.SERVICE_UNAVAILABLE,
  503: ERROR_CODES.SERVICE_UNAVAILABLE,
  504: ERROR_CODES.TIMEOUT
};

// Backend error message to error code mapping
export const backendErrorMapping: Record<string, string> = {
  'Invalid credentials': ERROR_CODES.INVALID_CREDENTIALS,
  'Incorrect username or password': ERROR_CODES.INVALID_CREDENTIALS,
  'Incorrect username or password.': ERROR_CODES.INVALID_CREDENTIALS,
  'User not found': ERROR_CODES.USER_NOT_FOUND,
  'Account is locked': ERROR_CODES.ACCOUNT_LOCKED,
  'Session expired': ERROR_CODES.SESSION_EXPIRED,
  'Unauthorized': ERROR_CODES.UNAUTHORIZED,
  'Invalid email format': ERROR_CODES.INVALID_EMAIL,
  'Invalid password': ERROR_CODES.INVALID_PASSWORD,
  'Required field missing': ERROR_CODES.REQUIRED_FIELD,
  'Network error': ERROR_CODES.NETWORK_ERROR,
  'Request timeout': ERROR_CODES.TIMEOUT,
  'Internal server error': ERROR_CODES.INTERNAL_SERVER_ERROR,
  'Service unavailable': ERROR_CODES.SERVICE_UNAVAILABLE,
  'Insufficient permissions': ERROR_CODES.INSUFFICIENT_PERMISSIONS,
  'Resource not found': ERROR_CODES.RESOURCE_NOT_FOUND,
  'Duplicate entry': ERROR_CODES.DUPLICATE_ENTRY
};

export function getErrorMessage(
  error: unknown,
  context?: string,
  fallbackMessage?: string
): string {
  // If using i18n - currently disabled
  const useI18n = false; // i18n && i18n.isInitialized;
  
  // Extract error details
  let errorCode: string | undefined;
  let errorMessage: string | undefined;
  let statusCode: number | undefined;
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Error Handler] Raw error:', error);
    console.log('[Error Handler] Context:', context);
  }
  
  if (error && typeof error === 'object') {
    // Check for error code
    if ('code' in error) {
      errorCode = String(error.code);
    }
    
    // Check for error message
    if ('message' in error) {
      errorMessage = String(error.message);
    }
    
    // Check for status code (from axios or API errors)
    if ('status' in error) {
      statusCode = Number(error.status);
    } else if ('response' in error && error.response && typeof error.response === 'object' && 'status' in error.response) {
      statusCode = Number(error.response.status);
    }
  }
  
  // Try to find a mapped error code
  let mappedErrorCode: string | undefined;
  
  // 1. Check if we have a direct error code
  if (errorCode && Object.values(ERROR_CODES).includes(errorCode as any)) {
    mappedErrorCode = errorCode;
  }
  
  // 2. Check backend error message mapping
  if (!mappedErrorCode && errorMessage) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Error Handler] Checking error message:', errorMessage);
    }
    for (const [backendMsg, code] of Object.entries(backendErrorMapping)) {
      if (errorMessage.toLowerCase().includes(backendMsg.toLowerCase())) {
        mappedErrorCode = code;
        if (process.env.NODE_ENV === 'development') {
          console.log('[Error Handler] Matched:', backendMsg, '->', code);
        }
        break;
      }
    }
  }
  
  // 3. Check HTTP status code mapping
  if (!mappedErrorCode && statusCode) {
    mappedErrorCode = httpStatusToErrorCode[statusCode];
  }
  
  // 4. Use context-specific default if provided
  if (!mappedErrorCode && context) {
    mappedErrorCode = `${context}.error`;
  }
  
  // 5. Default to generic error
  if (!mappedErrorCode) {
    mappedErrorCode = ERROR_CODES.DEFAULT_ERROR;
  }
  
  // Get the final message
  if (useI18n) {
    // return i18n.t(mappedErrorCode) || fallbackMessage || errorMessages[mappedErrorCode] || errorMessages[ERROR_CODES.DEFAULT_ERROR];
  }
  
  const message = errorMessages[mappedErrorCode];
  return message || fallbackMessage || errorMessages[ERROR_CODES.DEFAULT_ERROR] || 'An unexpected error occurred';
}

export function isNetworkError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  
  // Check for network-related error codes
  if ('code' in error) {
    const code = String(error.code);
    return ['ECONNABORTED', 'ETIMEDOUT', 'ENETUNREACH', 'ENOTFOUND'].includes(code);
  }
  
  // Check for axios network error
  if ('isAxiosError' in error && error.isAxiosError === true) {
    if ('response' in error && !error.response) {
      return true;
    }
  }
  
  return false;
}

export function isAuthenticationError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  
  // Check status code
  if ('status' in error && error.status === 401) return true;
  if ('response' in error && error.response && typeof error.response === 'object' && 'status' in error.response && error.response.status === 401) return true;
  
  // Check error code
  if ('code' in error) {
    const code = String(error.code);
    return [ERROR_CODES.UNAUTHORIZED, ERROR_CODES.SESSION_EXPIRED, ERROR_CODES.INVALID_CREDENTIALS].includes(code as any);
  }
  
  return false;
}

export function isValidationError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  
  // Check status code
  if ('status' in error && error.status === 400) return true;
  if ('response' in error && error.response && typeof error.response === 'object' && 'status' in error.response && error.response.status === 400) return true;
  
  // Check error code
  if ('code' in error) {
    const code = String(error.code);
    return code.startsWith('validation.');
  }
  
  return false;
}