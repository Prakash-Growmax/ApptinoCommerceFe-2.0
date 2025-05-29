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
                  d
                </span>
              ) : (
                <span role="img" aria-label="Moon" className="text-lg">
                  q
                </span>
              )}
            </Button>

            
          </div>
        </div>
      </header>
    );
  };
