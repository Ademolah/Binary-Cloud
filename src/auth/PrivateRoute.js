import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebaseConfig";
import Loader from "../components/Loader"; // Optional loader during auth check

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default PrivateRoute;
