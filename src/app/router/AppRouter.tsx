import { Navigate, Route, Routes } from 'react-router-dom';

import NotFoundPage from '@/features/error/routes/NotFoundPage';
import useAppStore from '@/stores/appStore';

import { generateRoutes } from './routeGenerator';
import { routeConfig } from './routes.config';

const AppRouter = () => {
  const { isAuthenticated } = useAppStore();

  if (!isAuthenticated) {
    <Navigate to={'/auth/login'} />;
  }

  return (
    <Routes>
      {generateRoutes(routeConfig)}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
