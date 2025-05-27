// src/App.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/router';
import { ErrorFallback, LoadingFallback } from '@components/organisms';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProviders>
        <Suspense fallback={<LoadingFallback />}>
          <AppRouter />
        </Suspense>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
