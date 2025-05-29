// src/App.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/router';
import { ErrorFallback, LoadingFallback } from '@components/organisms';
import Test from './test';
import DashboardPage from './features/dashboard/routes/Dashboard';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProviders>
        <Suspense fallback={<LoadingFallback />}>
         {/* <Test/> */}
         {/* <DashboardPage /> */}
          <AppRouter />
        </Suspense>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
