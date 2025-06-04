import { ReactNode } from 'react';

export interface RouteConfig {
  path: string;
  element: ReactNode;
  index?: boolean;
  children?: RouteConfig[];
  protected?: boolean;
  roles?: string[];
  layout?: 'main' | 'auth' | 'admin' | 'minimal' | 'dashboard';
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  fallback?: ReactNode;
  preload?: () => Promise<void>;
}

export interface RouteModule {
  routes: RouteConfig[];
  guard?: (user: any) => boolean;
  layout?: string;
}
