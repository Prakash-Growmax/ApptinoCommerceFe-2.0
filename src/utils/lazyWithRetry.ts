import { lazy, ComponentType } from 'react';

export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      // If chunk loading fails, it might be due to a new deployment
      // Retry once after a short delay
      console.error('Failed to load chunk, retrying...', error);
      
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        return await componentImport();
      } catch (retryError) {
        // If retry also fails, reload the page to get fresh chunks
        console.error('Retry failed, reloading page...', retryError);
        window.location.reload();
        
        // Return a promise that never resolves to prevent React from rendering
        return new Promise(() => {});
      }
    }
  });
}