// src/App.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/router';
import { ErrorFallback, LoadingFallback } from '@components/organisms';
import Test from './test';
import { AppbarHeader } from './components/molecules/Appbar/Appbar';
import { AppWithHeader } from './features/App/AppWithHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
