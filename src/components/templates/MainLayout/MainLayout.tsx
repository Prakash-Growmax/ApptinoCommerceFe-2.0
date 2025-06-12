import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingFallback } from '@/components/organisms';
import { AppHeader } from '@/components/organisms/AppHeader/AppHeader';

export const MainLayout = () => {
  return (
    <AppHeader>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </AppHeader>
  );
};
