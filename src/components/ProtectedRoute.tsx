import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
