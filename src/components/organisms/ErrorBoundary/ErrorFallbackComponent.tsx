import { useTranslation } from 'react-i18next';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ErrorFallbackComponentProps {
  error: Error;
  resetErrorBoundary: () => void;
  level: 'page' | 'section' | 'component';
  fallback?: React.ReactNode;
}

export function ErrorFallbackComponent({
  error,
  resetErrorBoundary,
  level,
  fallback,
}: ErrorFallbackComponentProps) {
  const { t } = useTranslation();

  // Return custom fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Different layouts based on error level
  const getErrorLayout = () => {
    switch (level) {
      case 'page':
        return (
          <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t('errors.pageError')}</h1>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              {t('errors.pageErrorDescription')}
            </p>
            <div className="flex gap-3">
              <Button onClick={resetErrorBoundary}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t('common.retry')}
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = '/')}
              >
                <Home className="h-4 w-4 mr-2" />
                {t('navigation.home')}
              </Button>
            </div>
            {import.meta.env.DEV && (
              <details className="mt-8 max-w-2xl">
                <summary className="cursor-pointer text-sm font-mono">
                  Error Details (Dev Only)
                </summary>
                <pre className="mt-2 text-xs bg-muted p-4 rounded overflow-auto">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        );

      case 'section':
        return (
          <div className="border border-destructive/20 rounded-lg p-6 bg-destructive/5">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold">{t('errors.sectionError')}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t('errors.sectionErrorDescription')}
            </p>
            <Button size="sm" onClick={resetErrorBoundary}>
              <RefreshCw className="h-3 w-3 mr-2" />
              {t('common.retry')}
            </Button>
          </div>
        );

      case 'component':
      default:
        return (
          <div className="border border-destructive/20 rounded-md p-4 bg-destructive/5 text-center">
            <AlertTriangle className="h-4 w-4 text-destructive mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              {t('errors.componentError')}
            </p>
            <Button size="sm" variant="outline" onClick={resetErrorBoundary}>
              {t('common.retry')}
            </Button>
          </div>
        );
    }
  };

  return getErrorLayout();
}
