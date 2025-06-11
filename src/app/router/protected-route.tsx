import { Navigate, useLocation } from 'react-router-dom';

import { LoadingFallback } from '@/components';
import useAppStore from '@/stores/appStore';
import { ProtectedRouteProps } from '@/types/router.types';

export const ProtectedRoute = ({
  children,
  redirectTo = '/auth/login',
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAuthLoading } = useAppStore();
  const location = useLocation();

  if (isAuthLoading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
