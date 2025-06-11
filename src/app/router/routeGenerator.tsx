// src/app/router/routeGenerator.tsx
import { JSX } from 'react';
import { Route } from 'react-router-dom';

import { AuthLayout, MainLayout } from '@/components';
import { RouteConfig } from '@/types/router.types';

import { ProtectedRoute } from './protected-route';

const getLayoutComponent = (layout: string) => {
  switch (layout) {
    case 'main':
      return MainLayout;
    case 'auth':
      return AuthLayout;
    default:
      return null;
  }
};

export const generateRoutes = (routes: RouteConfig[]): JSX.Element[] => {
  return routes.map(route => {
    const LayoutComponent = route.layout
      ? getLayoutComponent(route.layout)
      : null;

    // Handle routes with children (nested routes)
    if (route.children) {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={LayoutComponent ? <LayoutComponent /> : route.element}
        >
          {route.children.map(childRoute => {
            const element = childRoute.protected ? (
              <ProtectedRoute>{childRoute.element}</ProtectedRoute>
            ) : (
              childRoute.element
            );

            // Create props object conditionally
            const routeProps: any = {
              key: childRoute.path || 'index',
              element: element,
            };

            // Only add path if it's not an index route
            if (childRoute.index) {
              routeProps.index = true;
            } else if (childRoute.path) {
              routeProps.path = childRoute.path;
            }

            return <Route {...routeProps} />;
          })}
        </Route>
      );
    }

    // Handle single routes
    let element = route.element;

    if (route.protected) {
      element = <ProtectedRoute>{element}</ProtectedRoute>;
    }

    if (LayoutComponent) {
      return (
        <Route key={route.path} path={route.path} element={<LayoutComponent />}>
          <Route index element={element} />
        </Route>
      );
    }

    // Create props object conditionally for single routes
    const routeProps: any = {
      key: route.path,
      element: element,
    };

    // Only add path if it's not an index route
    if (route.index) {
      routeProps.index = true;
    } else if (route.path) {
      routeProps.path = route.path;
    }

    return <Route {...routeProps} />;
  });
};
