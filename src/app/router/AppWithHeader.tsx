// AppWithHeader.tsx
import { useLocation } from 'react-router-dom';

import AppRoutes from '@/app/router/AppRouter';
import { AppHeader } from '@/components/organisms/AppHeader/AppHeader';

export const AppWithHeader = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth/login';

  return isLoginPage ? (
    <AppRoutes />
  ) : (
    <AppHeader>
      <AppRoutes />
    </AppHeader>
  );
};
