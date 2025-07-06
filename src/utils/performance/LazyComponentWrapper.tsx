import React, { Suspense, lazy, ComponentType } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Generic fallback component
const DefaultFallback = ({ isLoading = true }: { isLoading?: boolean }) => (
  <div className="flex items-center justify-center p-8 min-h-[200px]">
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
      </div>
      <p className="text-sm text-muted-foreground">
        {isLoading ? 'Loading component...' : 'Component unavailable'}
      </p>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="flex items-center justify-center p-8 min-h-[200px]">
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="text-red-500 text-lg">⚠️</div>
      <div>
        <h3 className="text-sm font-semibold text-red-700">Failed to load component</h3>
        <p className="text-xs text-red-600 mt-1">{error.message}</p>
      </div>
      <button 
        onClick={resetErrorBoundary}
        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

// Intersection Observer based lazy loading
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: {
    fallback?: React.ComponentType;
    errorFallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
    threshold?: number;
    rootMargin?: string;
  }
) => {
  const LazyComponent = lazy(importFunc);
  
  const WrappedComponent = (props: React.ComponentProps<T>) => {
    const FallbackComponent = options?.fallback || DefaultFallback;
    const ErrorComponent = options?.errorFallback || ErrorFallback;
    
    return (
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<FallbackComponent />}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
  
  return WrappedComponent;
};

// Viewport-based lazy loading component
export const ViewportLazyComponent = <T extends ComponentType<any>>({
  importFunc,
  fallback: Fallback = DefaultFallback,
  threshold = 0.1,
  rootMargin = '50px',
  ...props
}: {
  importFunc: () => Promise<{ default: T }>;
  fallback?: React.ComponentType;
  threshold?: number;
  rootMargin?: string;
} & React.ComponentProps<T>) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !isLoaded) {
          setIsVisible(true);
          setIsLoaded(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, isLoaded]);

  const LazyComponent = React.useMemo(() => {
    return isVisible ? lazy(importFunc) : null;
  }, [isVisible, importFunc]);

  if (!LazyComponent) {
    return (
      <div ref={elementRef} className="min-h-[200px]">
        <Fallback />
      </div>
    );
  }

  return (
    <div ref={elementRef}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Fallback />}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

// Preload utility for predictive loading
export const preloadComponent = (importFunc: () => Promise<{ default: ComponentType<any> }>) => {
  const componentImport = importFunc();
  return componentImport;
};

// Component registry for managing lazy components
class LazyComponentRegistry {
  private components = new Map<string, Promise<{ default: ComponentType<any> }>>();
  private preloadQueue = new Set<string>();

  register(name: string, importFunc: () => Promise<{ default: ComponentType<any> }>) {
    if (!this.components.has(name)) {
      this.components.set(name, importFunc());
    }
  }

  preload(name: string) {
    if (this.components.has(name) && !this.preloadQueue.has(name)) {
      this.preloadQueue.add(name);
      this.components.get(name);
    }
  }

  get(name: string) {
    return this.components.get(name);
  }
}

export const lazyComponentRegistry = new LazyComponentRegistry();