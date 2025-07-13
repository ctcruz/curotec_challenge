import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
