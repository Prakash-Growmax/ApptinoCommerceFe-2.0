import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@components/atoms/Button/Button';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 text-8xl font-bold text-muted">404</div>

      <h1 className="mb-4 text-3xl font-bold">{t('errors.notFound')}</h1>

      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        {t('errors.notFoundDescription')}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/">
          <Button variant="default">{t('navigation.home')}</Button>
        </Link>

        <Button onClick={() => window.history.back()} variant="outline">
          {t('common.back')}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
