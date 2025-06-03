import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, isAdmin } = useAuth();

  console.log('ProtectedRoute - Usuario:', user); // Debug
  console.log('ProtectedRoute - Requiere admin:', requireAdmin); // Debug
  console.log('ProtectedRoute - Es admin:', isAdmin()); // Debug

  if (!user) {
    console.log('ProtectedRoute - No hay usuario, redirigiendo a login'); // Debug
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    console.log('ProtectedRoute - No es admin, redirigiendo a dashboard'); // Debug
    return <Navigate to="/dashboard" replace />;
  }

  console.log('ProtectedRoute - Acceso permitido'); // Debug
  return <>{children}</>;
};

export default ProtectedRoute;