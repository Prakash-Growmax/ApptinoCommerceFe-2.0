// src/test/utils/test-providers.tsx
import { ReactNode } from 'react';
import { I18nextProvider as ReactI18nextProvider } from 'react-i18next';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';

import { createTestI18n } from './i18n';

// Router Provider for tests
interface TestMemoryRouterProviderProps {
  children: ReactNode;
  routerOptions?: {
    initialEntries?: string[];
  };
}

export const TestMemoryRouterProvider = ({
  children,
  routerOptions = { initialEntries: ['/'] },
}: TestMemoryRouterProviderProps) => {
  return (
    <MemoryRouter {...routerOptions}>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </MemoryRouter>
  );
};

// Query Client Provider for tests
interface TestQueryClientProviderProps {
  children: ReactNode;
  client?: QueryClient;
}

export const TestQueryClientProvider = ({
  children,
  client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  }),
}: TestQueryClientProviderProps) => {
  return (
    <TanStackQueryClientProvider client={client}>
      {children}
    </TanStackQueryClientProvider>
  );
};

// i18n Provider for tests
interface TestI18nextProviderProps {
  children: ReactNode;
}

export const TestI18nextProvider = ({ children }: TestI18nextProviderProps) => {
  return (
    <ReactI18nextProvider i18n={createTestI18n()}>
      {children}
    </ReactI18nextProvider>
  );
};
