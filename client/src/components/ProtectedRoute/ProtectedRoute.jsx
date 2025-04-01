import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    // 如果未登录，重定向到登录页面
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;