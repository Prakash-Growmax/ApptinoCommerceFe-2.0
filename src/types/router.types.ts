import { ReactNode } from 'react';

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export interface RouteConfig {
  path: string;
  element?: ReactNode;
  protected?: boolean;
  layout?: 'main' | 'auth' | 'minimal';
  children?: RouteConfig[];
  index?: boolean;
  icon?: React.ComponentType<any>;
  meta?: {
    title?: string;
    description?: string;
    requiresAuth?: boolean;
  };
  showInSidebar?: boolean;
  userNav?: boolean; // user specific navigation

  //optional
  roles?: string[];
  fallback?: ReactNode;
  preload?: () => Promise<void>;
}

export interface PageInfo {
  title: string;
  description?: string;
  requiresAuth?: boolean;
  breadcrumb?: string[];
}
