import { useCallback, useState } from 'react';

/**
 * Hook to throw async errors that can be caught by Error Boundaries
 */
export function useAsyncError() {
  const [, setError] = useState<Error>();

  return useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}
