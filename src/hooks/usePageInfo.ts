import { useLocation, matchPath } from 'react-router-dom';

import { routeConfig } from '@/app/router/routes.config';
import { PageInfo, RouteConfig } from '@/types/router.types';

const findRouteInfo = (
  routes: RouteConfig[],
  pathname: string,
  basePath = ''
): PageInfo | null => {
  for (const route of routes) {
    const fullPath = basePath + route.path;
    
    // Use matchPath to handle dynamic segments like :id
    const match = matchPath(
      { path: fullPath },
      pathname
    );
    
    // Check if current route matches (including dynamic params)
    if (match || (route.index && pathname === basePath)) {
      return {
        title: route.meta?.title || 'Page',
        description: route.meta?.description || '',
        requiresAuth: route.meta?.requiresAuth || false,
      };
    }

    // Check children routes
    if (route.children) {
      const childResult = findRouteInfo(
        route.children,
        pathname,
        fullPath === '/' ? '' : fullPath
      );
      if (childResult) {
        return childResult;
      }
    }
  }

  return null;
};

export const usePageInfo = (): PageInfo | null => {
  const location = useLocation();
  return findRouteInfo(routeConfig, location.pathname);
};
