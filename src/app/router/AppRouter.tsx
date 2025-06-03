import { Route, Routes } from 'react-router-dom';

import { Settings } from 'lucide-react';

import Login from '@/features/auth/routes/LoginPage';
import Customers from '@/features/customer/Customer';
import DashboardPages from '@/features/dashboard/routes/DashboardPages';
import SupportTickets from '@/features/support/SupportTickets';

import { ProtectedRoute } from './protected-route';
import PublicRoute from './public-route';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supporttickets"
        element={
          <ProtectedRoute>
            <SupportTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      {/* Public route: Login */}
      <Route
        path="/auth/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
    </Routes>
  );
};
export default AppRoutes;
