// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("user_id");
  return isLoggedIn ? children : <Navigate to="/" replace />;
}
