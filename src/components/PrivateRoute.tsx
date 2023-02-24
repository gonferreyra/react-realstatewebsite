import React from "react";
import { Navigate, Outlet } from "react-router";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

interface IAuthStatus {
  loggedIn: boolean;
  checkingStatus: boolean;
}

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus<IAuthStatus>();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
