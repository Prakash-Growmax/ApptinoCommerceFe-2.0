import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import {
  Headset,
  LayoutDashboard,
  Settings as SettingsIcon,
  Users,
} from 'lucide-react';

import NotFoundPage from '@/features/error/routes/NotFoundPage';
import { RouteConfig } from '@/types/router.types';

const DashboardPages = lazy(
  () => import('@/features/dashboard/routes/DashboardPages')
);
const Support = lazy(() => import('@/features/support/Support'));
const Customers = lazy(() => import('@/features/customer/Customer'));
const Settings = lazy(() => import('@/features/settings/Settings'));
const Login = lazy(() => import('@/features/auth/routes/LoginPage'));

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    layout: 'main',
    element: <Navigate to="/dashboard" />,
  },
  {
    path: '/dashboard',
    layout: 'main',
    protected: true,
    element: <DashboardPages />,
    meta: {
      title: 'Dashboard',
      description: 'Main dashboard page',
    },
    icon: LayoutDashboard,
    showInSidebar: true,
  },
  {
    path: '/supporttickets',
    layout: 'main',
    protected: true,
    element: <Support />,
    meta: {
      title: 'Support Tickets',
      description: 'Manage support tickets',
    },
    icon: Headset,
    showInSidebar: true,
  },
  {
    path: '/customers',
    layout: 'main',
    protected: true,
    element: <Customers />,
    meta: {
      title: 'Customers',
      description: 'Customer management',
    },
    icon: Users,
    showInSidebar: true,
  },
  {
    path: '/settings',
    layout: 'main',
    protected: true,
    element: <Settings />,
    meta: {
      title: 'Settings',
      description: 'Application settings',
    },
    icon: SettingsIcon,
    showInSidebar: true,
  },
  {
    path: '/auth',
    layout: 'auth',
    children: [
      {
        path: 'login',
        element: <Login />,
        publicOnly: true,
        meta: {
          title: 'Login',
          description: 'User authentication',
        },
      },
      {
        path: '',
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
    layout: 'minimal',
    meta: {
      title: '404 - Page Not Found',
    },
  },
];
