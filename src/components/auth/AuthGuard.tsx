import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../lib/store/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ children, requireAuth = false }: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // If auth is required and user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If user is authenticated and tries to access auth pages, redirect to home
  if (isAuthenticated && location.pathname.startsWith('/auth')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}