// src/App.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/router';
import { ErrorFallback, LoadingFallback } from '@components/organisms';
import Test from './test';
import { AppbarHeader } from './components/molecules/Appbar/Appbar';
import { AppWithHeader } from './features/App/AppWithHeader';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProviders>
        <Suspense fallback={<LoadingFallback />}>
         <AppWithHeader />
        </Suspense>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
