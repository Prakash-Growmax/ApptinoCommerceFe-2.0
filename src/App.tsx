// src/App.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AppProviders } from '@app/providers';
import { ErrorFallback, LoadingFallback } from '@components/organisms';
<<<<<<< HEAD
=======
import Test from './test';
import { AppbarHeader } from './components/molecules/Appbar/Appbar';

>>>>>>> 13ebb4858f36cc6aae9a4d2c425cdf229d8ed5c0
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppWithHeader } from './app/router/AppWithHeader';

import { AppWithHeader } from './app/router/AppWithHeader';

function App() {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProviders>
        <Suspense fallback={<LoadingFallback />}>
          <QueryClientProvider client={queryClient}>
            <AppWithHeader />
          </QueryClientProvider>
        </Suspense>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
