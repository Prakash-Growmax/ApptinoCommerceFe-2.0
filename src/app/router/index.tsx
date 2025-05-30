import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@components/templates';

import { RouteObject } from './types';
import HomePage from "../../features/home/routes/HomePage"
import DashboardPage from "@/features/dashboard/routes/Dashboard"

// import { lazy } from 'react';
// import { ProtectedRoute } from './protected-route';


// const HomePage = lazy(() => import('@features/home/routes/HomePage'));
// const DashboardPage = lazy(
//   () => import('@features/dashboard/routes/Dashboard')
// );
// const LoginPage = lazy(() => import('@features/auth/routes/LoginPage'));
// const RegisterPage = lazy(() => import('@features/auth/routes/RegisterPage'));
// const NotFoundPage = lazy(() => import('@features/error/routes/NotFoundPage'));

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
        path: '/dashboard',
        // element: (
        //   <ProtectedRoute>
        //     <DashboardPage />
        //   </ProtectedRoute>
        // ),
        element: <DashboardPage />,
      },
    ],
  },
  // {
  //   path: '/auth',
  //   children: [
  //     {
  //       path: 'login',
  //       element: <LoginPage />,
  //     },
  //     {
  //       path: 'register',
  //       element: <RegisterPage />,
  //     },
  //     {
  //       index: true,
  //       element: <Navigate to="/auth/login" replace />,
  //     },
  //   ],
  // },
  // {
  //   path: '*',
  //   element: <NotFoundPage />,
  // },
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

        // return (
        //   <Route key={route.path} path={route.path} element={route.element} />
        // );
      })}
    </Routes>
  );
};

// export * from './protected-route';
// export * from './types';



// // src/app/router/index.tsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import HomePage from "../../features/home/routes/HomePage"
// import DashboardPage from "@/features/dashboard/routes/Dashboard"

// export const AppRouter = () => {
//   return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/dashboard" element={<DashboardPage />} />
    //   </Routes>
//     </Router>
//   )
// }
