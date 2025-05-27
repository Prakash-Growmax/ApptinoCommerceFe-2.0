import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

// Use shadcn/ui consistently

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 text-5xl" role="img" aria-label="Error icon">
        ⚠️
      </div>

      <h1 className="mb-2 text-2xl font-bold">{t('errors.general')}</h1>

      <p className="mb-6 max-w-md text-muted-foreground">
        {error.message || t('errors.tryAgain')}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={resetErrorBoundary}>{t('common.retry')}</Button>

        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          {t('navigation.home')}
        </Button>
      </div>

      {import.meta.env.DEV && (
        <details className="mt-8 max-w-2xl">
          <summary className="cursor-pointer font-mono text-sm">
            Stack trace (dev only)
          </summary>
          <pre className="mt-2 overflow-auto rounded-lg bg-muted p-4 text-left text-xs">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
};
