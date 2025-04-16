// src/components/Auth/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { accessToken, user } = useAppSelector((state) => state.auth);

  if (accessToken) {
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (user?.role === "vendor") return <Navigate to="/vendor" replace />;
    if (user?.role === "customer") return <Navigate to="/customer" replace />;
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;