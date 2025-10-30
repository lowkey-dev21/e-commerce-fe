import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useUser();
  if (user) {
    // already authenticated users should not access public/auth pages
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default PublicRoute;
