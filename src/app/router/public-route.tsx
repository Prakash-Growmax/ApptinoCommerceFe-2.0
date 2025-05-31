import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
   const { isAuthenticated} = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;