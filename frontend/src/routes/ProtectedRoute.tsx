import { Navigate, useLocation } from 'react-router-dom';
import type { RoleId } from '@/types';

interface Props {
  allowedRole: RoleId;
  children:    React.ReactNode;
}

export function ProtectedRoute({ allowedRole, children }: Props) {
  const location = useLocation();

  let savedRole: string | null = null;
  try {
     savedRole = localStorage.getItem('role'); } 
     catch { /* ignore */ }

  if (savedRole !== allowedRole) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}