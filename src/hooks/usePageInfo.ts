import { useLocation } from 'react-router-dom';

import { routeConfig } from '@/app/router/routes.config';
import { PageInfo, RouteConfig } from '@/types/router.types';

const findRouteInfo = (
  routes: RouteConfig[],
  pathname: string,
  basePath = ''
): PageInfo | null => {
  for (const route of routes) {
    const fullPath = basePath + route.path;
    console.log(pathname === fullPath);
    console.log(route.index && pathname === basePath)

    // Check if current route matches exactly
    if (pathname === fullPath || (route.index && pathname === basePath)) {
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
