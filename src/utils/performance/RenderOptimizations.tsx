import React, { 
  useMemo, 
  useCallback, 
  useState, 
  useRef, 
  useEffect,
  ComponentType,
  ReactNode
} from 'react';

// Virtual List Component for large datasets
interface VirtualListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number;
  className?: string;
}

export const VirtualList = <T,>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 3,
  className = '',
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleRange = useMemo(() => {
    const containerHeight = height;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, height, itemHeight, overscan, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) =>
            renderItem(item, visibleRange.startIndex + index)
          )}
        </div>
      </div>
    </div>
  );
};

// Memoized component factory
export const createMemoizedComponent = <P extends object>(
  Component: ComponentType<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return React.memo(Component, propsAreEqual);
};

// Performance wrapper for expensive components
interface PerformanceWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  componentName?: string;
}

export const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({
  children,
  fallback = <div>Loading...</div>,
  threshold = 16.67, // 60fps threshold
  componentName = 'Unknown',
}) => {
  const [isOptimized, setIsOptimized] = useState(false);
  const renderTimeRef = useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      renderTimeRef.current = renderTime;

      if (renderTime > threshold) {
        console.warn(
          `${componentName} render took ${renderTime.toFixed(2)}ms (>${threshold}ms threshold)`
        );
        setIsOptimized(true);
      }
    };
  });

  // If component is consistently slow, show fallback
  if (isOptimized && renderTimeRef.current > threshold * 2) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Optimized state updater hook
export const useOptimizedState = <T,>(
  initialValue: T,
  equalityFn?: (a: T, b: T) => boolean
) => {
  const [state, setState] = useState<T>(initialValue);
  const lastValueRef = useRef<T>(initialValue);

  const optimizedSetState = useCallback((newValue: T | ((prev: T) => T)) => {
    setState(prevState => {
      const nextValue = typeof newValue === 'function' 
        ? (newValue as (prev: T) => T)(prevState)
        : newValue;

      // Use custom equality function if provided, otherwise use Object.is
      const areEqual = equalityFn 
        ? equalityFn(lastValueRef.current, nextValue)
        : Object.is(lastValueRef.current, nextValue);

      if (areEqual) {
        return prevState; // Don't update if values are equal
      }

      lastValueRef.current = nextValue;
      return nextValue;
    });
  }, [equalityFn]);

  return [state, optimizedSetState] as const;
};

// Batch state updates hook
export const useBatchedUpdates = () => {
  const [, setUpdateQueue] = useState<(() => void)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const batchUpdate = useCallback((update: () => void) => {
    setUpdateQueue(prev => [...prev, update]);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setUpdateQueue(queue => {
        queue.forEach(update => update());
        return [];
      });
    }, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return batchUpdate;
};

// Optimized list renderer
interface OptimizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getItemKey: (item: T, index: number) => string | number;
  chunkSize?: number;
  className?: string;
}

export const OptimizedList = <T,>({
  items,
  renderItem,
  getItemKey,
  chunkSize = 50,
  className = '',
}: OptimizedListProps<T>) => {
  const [visibleChunks, setVisibleChunks] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleChunks * chunkSize);
  }, [items, visibleChunks, chunkSize]);

  const loadMore = useCallback(() => {
    if (visibleItems.length < items.length) {
      setVisibleChunks(prev => prev + 1);
    }
  }, [visibleItems.length, items.length]);

  // Intersection observer for loading more items
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const lastChild = container.lastElementChild;
    if (lastChild) {
      observer.observe(lastChild);
    }

    return () => observer.disconnect();
  }, [loadMore, visibleItems]);

  return (
    <div ref={containerRef} className={className}>
      {visibleItems.map((item, index) => (
        <div key={getItemKey(item, index)}>
          {renderItem(item, index)}
        </div>
      ))}
      {visibleItems.length < items.length && (
        <div className="text-center py-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

// Debounced component re-render hook
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<T>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T,
    [delay, ...deps]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

// Smart component that only renders when needed
interface SmartComponentProps {
  children: ReactNode;
  shouldRender: boolean;
  fallback?: ReactNode;
  keepAlive?: boolean;
}

export const SmartComponent: React.FC<SmartComponentProps> = ({
  children,
  shouldRender,
  fallback = null,
  keepAlive = false,
}) => {
  const [hasRendered, setHasRendered] = useState(false);
  const contentRef = useRef<ReactNode>(null);

  useEffect(() => {
    if (shouldRender) {
      setHasRendered(true);
    }
  }, [shouldRender]);

  if (shouldRender) {
    contentRef.current = children;
    return <>{children}</>;
  }

  if (keepAlive && hasRendered) {
    return <div style={{ display: 'none' }}>{contentRef.current}</div>;
  }

  return <>{fallback}</>;
};

// Performance monitoring HOC
export const withPerformanceMonitoring = <P extends object>(
  WrappedComponent: ComponentType<P>,
  componentName?: string
) => {
  const MonitoredComponent = (props: P) => {
    const renderCount = useRef(0);
    const lastRenderTime = useRef<number>(0);

    useEffect(() => {
      const startTime = performance.now();
      renderCount.current++;

      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        lastRenderTime.current = renderTime;

        if (renderTime > 16.67) {
          console.warn(
            `${componentName || WrappedComponent.name} render #${renderCount.current} took ${renderTime.toFixed(2)}ms`
          );
        }
      };
    });

    return <WrappedComponent {...props} />;
  };

  MonitoredComponent.displayName = `withPerformanceMonitoring(${componentName || WrappedComponent.name})`;
  
  return MonitoredComponent;
};

// Optimized form field component
interface OptimizedFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export const OptimizedField: React.FC<OptimizedFieldProps> = React.memo(({
  value,
  onChange,
  placeholder = '',
  debounceMs = 300,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  }, [onChange, debounceMs]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <input
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
});


  