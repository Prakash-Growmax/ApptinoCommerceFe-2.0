import { Link, useLocation } from 'react-router-dom';

import { ChevronRight, Home } from 'lucide-react';

import { routeConfig } from '@/app/router/routes.config';
import { RouteConfig } from '@/types/router.types';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

const findRouteTitle = (
  routes: RouteConfig[],
  targetPath: string,
  basePath = ''
): string | null => {
  for (const route of routes) {
    const fullPath = basePath + route.path;

    if (fullPath === targetPath || (route.index && targetPath === basePath)) {
      return route.meta?.title || null;
    }

    if (route.children) {
      const childResult = findRouteTitle(
        route.children,
        targetPath,
        fullPath === '/' ? '' : fullPath
      );
      if (childResult) return childResult;
    }
  }
  return null;
};

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always add home
  breadcrumbs.push({ label: 'Home', path: '/' });

  // Build breadcrumb path
  let currentPath = '';
  paths.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isActive = index === paths.length - 1;

    // Try to get title from route config
    const title = findRouteTitle(routeConfig, currentPath);

    if (title) {
      breadcrumbs.push({
        label: title,
        path: currentPath,
        isActive,
      });
    }
  });

  return breadcrumbs;
};
export const BreadcrumbNavigation = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  // Don't show breadcrumbs on home or auth pages
  if (location.pathname === '/' || location.pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
      {breadcrumbs.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {item.isActive ? (
            <span className="text-gray-900 font-medium">
              {index === 0 ? <Home className="h-4 w-4" /> : item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-gray-700 transition-colors flex items-center"
            >
              {index === 0 ? <Home className="h-4 w-4" /> : item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
