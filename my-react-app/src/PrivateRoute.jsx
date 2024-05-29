// ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = !!document.cookie.split('; ').find(row => row.startsWith('nickname='));

  return isAuthenticated ? Component : <Navigate to="/" />;
};
export default PrivateRoute;
