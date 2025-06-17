import { useTranslation } from 'react-i18next';

export const LoadingFallback = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      {/* Simple spinner */}
      <div className="h-10 w-10 animate-spin rounded-full border-3 border-muted-foreground/20 border-t-primary"></div>
      
      {/* Loading text */}
      <p className="mt-4 text-sm text-muted-foreground">
        {t('common.loading')}
      </p>
    </div>
  );
};
