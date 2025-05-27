import { ReactNode } from 'react';
import {
  I18nextProvider as ReactI18nextProvider,
  initReactI18next,
} from 'react-i18next';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';
import i18n from 'i18next';

// Router Provider for tests
interface MemoryRouterProviderProps {
  children: ReactNode;
  routerOptions?: {
    initialEntries?: string[];
  };
}

export const MemoryRouterProvider = ({
  children,
  routerOptions = { initialEntries: ['/'] },
}: MemoryRouterProviderProps) => {
  return (
    <MemoryRouter {...routerOptions}>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </MemoryRouter>
  );
};

// Query Client Provider for tests
interface QueryClientProviderProps {
  children: ReactNode;
  client?: QueryClient;
}

export const QueryClientProvider = ({
  children,
  client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  }),
}: QueryClientProviderProps) => {
  return (
    <TanStackQueryClientProvider client={client}>
      {children}
    </TanStackQueryClientProvider>
  );
};

// i18n Provider for tests
interface I18nextProviderProps {
  children: ReactNode;
}

// Initialize i18n instance for tests
const testI18n = i18n.createInstance();
testI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {},
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export const I18nextProvider = ({ children }: I18nextProviderProps) => {
  return (
    <ReactI18nextProvider i18n={testI18n}>{children}</ReactI18nextProvider>
  );
};
