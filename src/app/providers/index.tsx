import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { I18nProvider } from './i18n-provider';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Application providers wrapper component
 * Provides all the context providers needed for the application
 */
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <BrowserRouter>
      <QueryProvider>
        <I18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </QueryProvider>
    </BrowserRouter>
  );
};

export * from './i18n-provider';
export * from './query-provider';
export * from './theme-provider';
