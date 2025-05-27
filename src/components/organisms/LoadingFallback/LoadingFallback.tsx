import { useTranslation } from 'react-i18next';

export const LoadingFallback = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="mt-4 text-lg font-medium text-muted-foreground">
        {t('common.loading')}
      </p>
    </div>
  );
};
