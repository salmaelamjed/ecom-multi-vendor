import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "vendor" | "customer";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  // Vérifiez si l'utilisateur est authentifié
  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  // Récupérez le rôle de l'utilisateur depuis le localStorage
  const userRole = localStorage.getItem("role");

  if (!isAuthenticated) {
    // Redirigez vers la page de login si l'utilisateur n'est pas authentifié
    return <Navigate to="/login" replace />;
  }

  // Vérifiez si l'utilisateur a le rôle requis
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />; // Redirigez vers une page "non autorisé"
  }

  // Si l'utilisateur est authentifié (et a le rôle requis), affichez les enfants
  return <>{children}</>;
};

export default ProtectedRoute;