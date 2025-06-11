import { FileText } from 'lucide-react';

import { RouteConfig } from '@/types/router.types';

export interface NavigationProject {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
}

/**
 * Generate navigation items from route configuration using showInSidebar flag
 */
export const generateNavigationFromRoutes = (
  routes: RouteConfig[]
): NavigationProject[] => {
  const navigationItems: NavigationProject[] = [];

  routes.forEach(route => {
    // Use the showInSidebar flag to determine if route should be shown
    if (route.showInSidebar && route.meta?.title) {
      navigationItems.push({
        name: route.meta.title,
        url: route.path,
        icon: route.icon || FileText, // Use route's icon or fallback
      });
    }

    // Handle nested routes that should be shown in sidebar
    if (route.children) {
      route.children.forEach(child => {
        if (child.showInSidebar && child.meta?.title && child.path) {
          const fullPath =
            route.path === '/'
              ? `/${child.path}`
              : `${route.path}/${child.path}`;

          navigationItems.push({
            name: child.meta.title,
            url: fullPath,
            icon: child.icon || FileText,
          });
        }
      });
    }
  });

  return navigationItems;
};

/**
 * Get user navigation routes (settings, profile, etc.)
 * You can customize this by adding a userNav flag to routes if needed
 */
export const getUserNavigationFromRoutes = (
  routes: RouteConfig[]
): NavigationProject[] => {
  return routes
    .filter(
      route =>
        route.path === '/settings' && route.showInSidebar && route.meta?.title
    )
    .map(route => ({
      name: route.meta!.title as string,
      url: route.path,
      icon: route.icon || FileText,
    }));
};

// Alternative: If you want specific user navigation, you could add a userNav flag
export const getUserNavigationWithFlag = (
  routes: RouteConfig[]
): NavigationProject[] => {
  return routes
    .filter(route => route.userNav === true) // Add userNav?: boolean to RouteConfig
    .map(route => ({
      name: route.meta!.title as string,
      url: route.path,
      icon: route.icon || FileText,
    }));
};
