// AppWithHeader.tsx
import { useLocation } from 'react-router-dom';

import AppRoutes from '@/app/router/AppRouter';
import { AppbarHeader } from '@/components/molecules/Appbar/Appbar';

export const AppWithHeader = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth/login';

  return isLoginPage ? (
    <AppRoutes />
  ) : (
    <AppbarHeader>
      <AppRoutes />
    </AppbarHeader>
  );
};
