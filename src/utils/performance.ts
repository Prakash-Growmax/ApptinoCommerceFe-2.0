import { useCallback, useEffect, useRef } from 'react';

/**
 * Debounce utility function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle utility function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Hook to detect memory leaks in useEffect
 */
export function useMemoryLeakDetector(componentName: string) {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Memory Leak Detector] ${componentName} unmounted`);
      }
    };
  }, [componentName]);

  const checkIfMounted = useCallback(() => {
    if (!isMountedRef.current && process.env.NODE_ENV === 'development') {
      console.warn(
        `[Memory Leak Warning] Attempted to update state on unmounted component: ${componentName}`
      );
    }
    return isMountedRef.current;
  }, [componentName]);

  return { isMounted: isMountedRef.current, checkIfMounted };
}

/**
 * Hook to cleanup async operations
 */
export function useAsyncCleanup() {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const getSignal = useCallback(() => {
    return abortControllerRef.current?.signal;
  }, []);

  return { signal: getSignal() };
}

/**
 * Performance monitoring utilities
 */
export const performanceMonitor = {
  measureRenderTime: (componentName: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        if (process.env.NODE_ENV === 'development' && renderTime > 16) {
          console.warn(
            `[Performance Warning] ${componentName} took ${renderTime.toFixed(2)}ms to render`
          );
        }
      };
    }
    return () => {};
  },

  trackBundleSize: () => {
    if (typeof window !== 'undefined' && window.performance && 'memory' in performance) {
      const memory = (performance as any).memory;
      
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  },
};