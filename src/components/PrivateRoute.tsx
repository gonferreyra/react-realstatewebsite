import React from "react";
import { Navigate, Outlet } from "react-router";
import useAuthStatus from "../hooks/useAuthStatus";

interface IAuthStatus {
  loggedIn: boolean;
  checkingStatus: boolean;
}

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus<IAuthStatus>();

  if (checkingStatus) {
    return <h3>Loading...</h3>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
