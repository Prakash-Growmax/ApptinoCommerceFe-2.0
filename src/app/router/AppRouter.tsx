import { Route, Routes } from 'react-router-dom';

import NotFoundPage from '@/features/error/routes/NotFoundPage';

import { generateRoutes } from './routeGenerator';
import { routeConfig } from './routes.config';

const AppRouter = () => {
  return (
    <Routes>
      {generateRoutes(routeConfig)}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
