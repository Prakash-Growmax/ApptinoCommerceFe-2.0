import React, { useEffect, useRef, useCallback } from 'react';

// Memory-safe useEffect hook that automatically cleans up async operations
export const useMemorySafeEffect = (
  effect: (signal: AbortSignal) => void | (() => void),
  deps?: React.DependencyList
) => {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const cleanup = effect(abortController.signal);
    
    if (typeof cleanup === 'function') {
      cleanupRef.current = cleanup;
    }

    return () => {
      abortController.abort();
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, deps);
};

// Memory-safe async effect hook
export const useAsyncEffect = (
  effect: (signal: AbortSignal) => Promise<void | (() => void)>,
  deps?: React.DependencyList
) => {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const runEffect = async () => {
      try {
        const cleanup = await effect(abortController.signal);
        if (typeof cleanup === 'function' && !abortController.signal.aborted) {
          cleanupRef.current = cleanup;
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Async effect error:', error);
        }
      }
    };

    runEffect();

    return () => {
      abortController.abort();
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, deps);
};

// Memory-safe interval hook
export const useMemorySafeInterval = (
  callback: () => void,
  delay: number | null,
  immediate = false
) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => {
      savedCallback.current?.();
    }, delay);

    if (immediate) {
      savedCallback.current?.();
    }

    return () => clearInterval(id);
  }, [delay, immediate]);
};

// Memory-safe timeout hook
export const useMemorySafeTimeout = (
  callback: () => void,
  delay: number | null
) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => {
      savedCallback.current?.();
    }, delay);

    return () => clearTimeout(id);
  }, [delay]);
};

// Memory-safe event listener hook
export const useMemorySafeEventListener = <T extends keyof WindowEventMap>(
  eventName: T,
  handler: (event: WindowEventMap[T]) => void,
  element: Element | Window | null = null
) => {
  const savedHandler = useRef<(event: WindowEventMap[T]) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element || window;
    if (!targetElement?.addEventListener) return;

    const eventListener = (event: Event) => {
      savedHandler.current?.(event as WindowEventMap[T]);
    };

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

// Memory-safe fetch hook
export const useMemorySafeFetch = <T>(
  url: string,
  options?: RequestInit
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} => {
  const [state, setState] = React.useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: T = await response.json();
      
      if (!abortControllerRef.current.signal.aborted) {
        setState({ data, loading: false, error: null });
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError' && !abortControllerRef.current?.signal.aborted) {
        setState({ data: null, loading: false, error: error });
      }
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
};

// Memory-safe observer hook (for Intersection Observer, ResizeObserver, etc.)
export const useMemorySafeObserver = <T extends Element>(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const targetRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    observerRef.current = new IntersectionObserver(callback, options);
    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return targetRef;
};