import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import { Headset, Settings as SettingsIcon, Users } from 'lucide-react';

import NotFoundPage from '@/features/error/routes/NotFoundPage';
import SupportLanding from '@/features/support/routes/SupportLanding';
import { RouteConfig } from '@/types/router.types';

const Customers = lazy(() => import('@/features/customer/route/Customer'));
const Settings = lazy(() => import('@/features/settings/Settings'));
const Login = lazy(() => import('@/features/auth/routes/LoginPage'));
const SupportDetails = lazy(
  () => import('@/features/support/routes/SupportDetails')
);
export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    layout: 'main',
    element: <Navigate to="/supporttickets" />,
  },
  // {
  //   path: '/dashboard',
  //   layout: 'main',
  //   protected: true,
  //   element: <DashboardPages />,
  //   meta: {
  //     title: 'Dashboard',
  //     description: 'Main dashboard page',
  //   },
  //   icon: LayoutDashboard,
  //   showInSidebar: true,
  // },
  {
    path: '/supporttickets',
    layout: 'main',
    protected: true,
    element: <SupportLanding />,
    meta: {
      title: 'Support Tickets',
      description: 'Manage support tickets',
    },
    icon: Headset,
    showInSidebar: true,
  },
  {
    path: `/supporttickets/servicedetails/:id`,
    layout: `main`,
    protected: true,
    element: <SupportDetails />,
    meta: {
      title: 'ServiceDetails',
      description: ' support tickets details',
    },
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
