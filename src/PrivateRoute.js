import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

function PrivateRoute({ element, ...rest }) {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
