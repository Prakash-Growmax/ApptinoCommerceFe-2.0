import { useTranslation } from 'react-i18next';

export const LoadingFallback = () => {
  const { t } = useTranslation();

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-label={t('common.loading')}
    >
      {/* Simple spinner */}
      <div 
        className="h-10 w-10 animate-spin rounded-full border-3 border-muted-foreground/20 border-t-primary"
        aria-hidden="true"
      ></div>
      
      {/* Loading text */}
      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {t('common.loading')}
      </p>
      
      {/* Screen reader only announcement */}
      <div className="sr-only" aria-live="assertive">
        {t('common.loading')}
      </div>
    </div>
  );
};
