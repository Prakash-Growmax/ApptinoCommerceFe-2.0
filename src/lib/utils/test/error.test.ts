// src/lib/utils/test/error.test.ts
import { describe, it, expect, vi } from 'vitest';
import { handleError, isNetworkError, getErrorMessage } from '../../../utils/errorHandling';

describe('Error Utils', () => {
  it('should handle API errors correctly', () => {
    const apiError = {
      message: 'Validation failed',
      status: 400,
      code: 'BAD_REQUEST',
      response: {
        data: {
          errors: { email: 'Invalid email' }
        }
      }
    };

    const message = handleError(apiError, 'API');
    expect(message).toBe('Validation failed');
  });

  it('should detect network errors', () => {
    const networkError = { code: 'NETWORK_ERROR' };
    const apiError = { response: { status: 500 } };

    expect(isNetworkError(networkError)).toBe(true);
    expect(isNetworkError(apiError)).toBe(false);
  });

  it('should format error messages', () => {
    const simpleError = new Error('Simple error');
    const validationError = {
      message: 'Validation failed',
      details: { email: 'Required', name: 'Too short' }
    };

    expect(getErrorMessage(simpleError)).toBe('Simple error');
    expect(getErrorMessage(validationError)).toBe('Validation failed');
  });

  it('should handle unknown error types', () => {
    const unknownError = { weird: 'object' };
    const nullError = null;

    expect(getErrorMessage(unknownError)).toBe('An unexpected error occurred');
    expect(getErrorMessage(nullError)).toBe('An unexpected error occurred');
  });

  it('should log errors appropriately', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const error = new Error('Test error');
    handleError(error, 'TestContext');

    expect(consoleSpy).toHaveBeenCalledWith('[TestContext] Error:', error);

    consoleSpy.mockRestore();
  });
});
