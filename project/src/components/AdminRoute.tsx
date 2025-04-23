import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.email !== 'admin@usm.my') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;