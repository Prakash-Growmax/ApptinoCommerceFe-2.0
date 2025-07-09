// import { ApiError } from '@/types/lib/api.types';

// /**
//  * Type guard to check if an error is an ApiError
//  */
// export const isApiError = (error: unknown): error is ApiError => {
//   return (
//     typeof error === 'object' &&
//     error !== null &&
//     'message' in error &&
//     typeof (error as ApiError).message === 'string' &&
//     'status' in error &&
//     typeof (error as ApiError).status === 'number'
//   );
// };

// /**
//  * Type guard to check if an error is a standard Error
//  */
// export const isStandardError = (error: unknown): error is Error => {
//   return error instanceof Error;
// };

// /**
//  * Extracts a user-friendly error message from various error types
//  */
// export const getErrorMessage = (error: unknown, fallbackMessage = 'An unexpected error occurred'): string => {
//   if (isApiError(error)) {
//     return error.message;
//   }
  
//   if (isStandardError(error)) {
//     return error.message;
//   }
  
//   // Handle cases where error might be a string
//   if (typeof error === 'string') {
//     return error;
//   }
  
//   // Handle cases where error might be an object with a message property
//   if (typeof error === 'object' && error !== null && 'message' in error) {
//     const message = (error as { message: unknown }).message;
//     if (typeof message === 'string') {
//       return message;
//     }
//   }
  
//   return fallbackMessage;
// };

// /**
//  * Logs an error with appropriate context
//  */
// export const logError = (error: unknown, context: string): void => {
//   console.error(`[${context}] Error:`, error);
  
//   if (isApiError(error)) {
//     console.error(`[${context}] API Error Details:`, {
//       message: error.message,
//       status: error.status,
//       code: error.code,
//     });
//   }
// };

// /**
//  * Enhanced error handler that combines logging and message extraction
//  */
// export const handleError = (
//   error: unknown,
//   context: string,
//   fallbackMessage?: string
// ): string => {
//   logError(error, context);
//   return getErrorMessage(error, fallbackMessage);
// };



// src/lib/utils/validation.ts
import { ApiError } from '@/types/lib/api.types';

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
 * Checks if error is a network error (simple example)
 */
export const isNetworkError = (error: unknown): boolean => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as any).code === 'NETWORK_ERROR'
  );
};

/**
 * Extracts a user-friendly error message from various error types
 */
export const getErrorMessage = (
  error: unknown,
  fallbackMessage = 'An unexpected error occurred'
): string => {
  if (isApiError(error)) {
    return error.message;
  }

  if (isStandardError(error)) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === 'string') {
      return message;
    }
  }

  return fallbackMessage;
};

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
  return getErrorMessage(error, fallbackMessage);
};
