import { Navigate, useLocation } from 'react-router-dom';

import { LoadingFallback } from '@/components';
import useAppStore from '@/stores/appStore';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const PublicOnlyRoute = ({
  children,
  redirectTo = '/supporttickets',
}: PublicOnlyRouteProps) => {
  const { isAuthenticated, isAuthLoading, isAppLoading } = useAppStore();
  const location = useLocation();

  if (isAuthLoading || isAppLoading) {
    return <LoadingFallback />;
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname;
    const destination = from || redirectTo;
    return <Navigate to={destination} replace />;
  }

  return <>{children}</>;
};
