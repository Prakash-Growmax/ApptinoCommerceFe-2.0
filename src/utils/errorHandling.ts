import { ApiError } from '@/types/lib/api.types';
import { 
  getErrorMessage as getFormattedErrorMessage,
  isNetworkError as checkNetworkError,
  isAuthenticationError as checkAuthError,
  isValidationError as checkValidationError
} from './errorMessages';

/**
 * Type guard to check if an error is an ApiError
 */
export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiError).message === 'string' &&
    'status' in error &&
    typeof (error as ApiError).status === 'number'
  );
};

/**
 * Type guard to check if an error is a standard Error
 */
export const isStandardError = (error: unknown): error is Error => {
  return error instanceof Error;
};

/**
 * Extracts a user-friendly error message from various error types
 * This is the legacy function - new code should use getFormattedErrorMessage from errorMessages.ts
 */
export const getErrorMessage = (error: unknown, fallbackMessage = 'An unexpected error occurred'): string => {
  // Use the new error message system
  return getFormattedErrorMessage(error, undefined, fallbackMessage);
};

// Re-export error checking utilities
export const isNetworkError = checkNetworkError;
export const isAuthenticationError = checkAuthError;
export const isValidationError = checkValidationError;

/**
 * Logs an error with appropriate context
 */
export const logError = (error: unknown, context: string): void => {
  console.error(`[${context}] Error:`, error);
  
  if (isApiError(error)) {
    console.error(`[${context}] API Error Details:`, {
      message: error.message,
      status: error.status,
      code: error.code,
    });
  }
};

/**
 * Enhanced error handler that combines logging and message extraction
 */
export const handleError = (
  error: unknown,
  context: string,
  fallbackMessage?: string
): string => {
  logError(error, context);
  return getFormattedErrorMessage(error, context, fallbackMessage);
};

/**
 * Get error details for development/debugging
 */
export const getErrorDetails = (error: unknown): Record<string, unknown> => {
  const details: Record<string, unknown> = {
    message: getErrorMessage(error),
    type: error?.constructor?.name || typeof error,
  };

  if (isApiError(error)) {
    details.status = error.status;
    details.code = error.code;
    details.isApiError = true;
  }

  if (isNetworkError(error)) {
    details.isNetworkError = true;
  }

  if (isAuthenticationError(error)) {
    details.isAuthError = true;
  }

  if (isValidationError(error)) {
    details.isValidationError = true;
  }

  return details;
};