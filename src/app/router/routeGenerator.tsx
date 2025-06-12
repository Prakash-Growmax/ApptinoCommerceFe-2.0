import { JSX } from 'react';
import { Route } from 'react-router-dom';

import { AuthLayout, MainLayout } from '@/components';
import { RouteConfig } from '@/types/router.types';

import { ProtectedRoute } from './protected-route';
import { PublicOnlyRoute } from './public-route';

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
              <PublicOnlyRoute>{childRoute.element}</PublicOnlyRoute>
            );

            const routeProps: any = {
              key: childRoute.path || 'index',
              element: element,
            };

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

    let element = route.element;
    if (route.protected) {
      element = <ProtectedRoute>{element}</ProtectedRoute>;
    } else {
      element = <PublicOnlyRoute>{element}</PublicOnlyRoute>;
    }

    if (LayoutComponent) {
      return (
        <Route key={route.path} path={route.path} element={<LayoutComponent />}>
          <Route index element={element} />
        </Route>
      );
    }

    const routeProps: any = {
      key: route.path,
      element: element,
    };

    if (route.index) {
      routeProps.index = true;
    } else if (route.path) {
      routeProps.path = route.path;
    }

    return <Route {...routeProps} />;
  });
};
