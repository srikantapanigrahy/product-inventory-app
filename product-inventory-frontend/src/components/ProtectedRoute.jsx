import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // 🚫 Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Authorized → render child component
  return children;
}
