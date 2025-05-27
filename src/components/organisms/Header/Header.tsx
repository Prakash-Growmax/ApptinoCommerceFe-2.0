import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useTheme } from '@app/providers';
import { Button } from '@components/atoms/Button/Button';

export const Header = () => {
  const { t } = useTranslation();
  const {  setTheme, isDarkMode } = useTheme();

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="text-xl text-primary">{t('app.title')}</span>
          </Link>

          <nav className="hidden md:flex md:gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              {t('navigation.home')}
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary"
            >
              {t('navigation.dashboard')}
            </Link>
            <Link
              to="/profile"
              className="text-sm font-medium hover:text-primary"
            >
              {t('navigation.profile')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {isDarkMode ? (
              <span role="img" aria-label="Sun" className="text-lg">
                🌞
              </span>
            ) : (
              <span role="img" aria-label="Moon" className="text-lg">
                🌙
              </span>
            )}
          </Button>

          <Link to="/auth/login">
            <Button variant="outline" size="sm">
              {t('auth.login')}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
