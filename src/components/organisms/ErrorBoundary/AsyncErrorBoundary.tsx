import { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { logErrorBoundary } from '@lib/monitoring';

import { ErrorFallbackComponent } from './ErrorFallbackComponent';

interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
  level?: 'page' | 'section' | 'component';
}

// Custom error for async operations
export class AsyncError extends Error {
  constructor(
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AsyncError';
  }
}

// Higher-order component for async error handling
export function withAsyncErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <AsyncErrorBoundary fallback={fallback}>
        <Component {...props} />
      </AsyncErrorBoundary>
    );
  };
}

export function AsyncErrorBoundary({
  children,
  fallback,
  onError,
  level = 'component',
}: AsyncErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: any) => {
    // Log to monitoring service
    logErrorBoundary(error, { ...errorInfo, level });

    // Call custom error handler
    onError?.(error, errorInfo);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorFallbackComponent
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          level={level}
          fallback={fallback}
        />
      )}
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  );
}
