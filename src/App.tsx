import { Suspense, useEffect } from 'react';

import { AppProviders } from '@app/providers';
import { Toaster } from 'sonner';

import AppRouter from './app/router/AppRouter';
import { LoadingFallback } from './components';
import useAppStore from './stores/appStore';
import { useInitializePreferences } from '@/features/settings/hooks/useInitializePreferences';

function App() {
  const { hasHydrated, isAppLoading, isAuthLoading, initializeAuthAction } =
    useAppStore();

  // Initialize user preferences
  useInitializePreferences();

  useEffect(() => {
    initializeAuthAction();
  }, [initializeAuthAction]);

  if (!hasHydrated || isAppLoading || isAuthLoading) {
    return <LoadingFallback />;
  }

  return (
    <AppProviders>
      <Suspense fallback={<LoadingFallback />}>
        <AppRouter />
      </Suspense>
      <Toaster richColors expand />
    </AppProviders>
  );
}

export default App;
