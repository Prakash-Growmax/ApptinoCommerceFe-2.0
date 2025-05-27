import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from '@components/templates';

import { ProtectedRoute } from './protected-route';
import { RouteObject } from './types';

// Lazy-loaded pages
const HomePage = lazy(() => import('@features/home/routes/HomePage'));
const DashboardPage = lazy(
  () => import('@features/dashboard/routes/Dashboard')
);
const LoginPage = lazy(() => import('@features/auth/routes/LoginPage'));
const RegisterPage = lazy(() => import('@features/auth/routes/RegisterPage'));
const NotFoundPage = lazy(() => import('@features/error/routes/NotFoundPage'));

// Route configuration
const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map(route => {
        // Route with children
        if (route.children) {
          return (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children.map(childRoute => (
                <Route
                  key={childRoute.path || 'index'}
                  path={childRoute.path}
                  index={childRoute.index}
                  element={childRoute.element}
                />
              ))}
            </Route>
          );
        }

        return (
          <Route key={route.path} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
};

export * from './protected-route';
export * from './types';
