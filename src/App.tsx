// src/App.tsx
import { Suspense, useEffect } from 'react';

import { AppProviders } from '@app/providers';
import { Toaster } from 'sonner';

import AppRouter from './app/router/AppRouter';
import { LoadingFallback } from './components';
import useAppStore from './stores/appStore';

function App() {
  const { initializeAuthAction, isAuthenticated, isAuthLoading } =
    useAppStore();
  console.log('🚀 ~ App ~ isAuthenticated:', isAuthenticated, isAuthLoading);

  useEffect(() => {
    initializeAuthAction();
  }, [initializeAuthAction]);

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
