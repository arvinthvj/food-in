import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props;
  const isLoggedIn: boolean = localStorage.getItem("userDetails") !== null;
  const location = useLocation();

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/login"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
};

export default PrivateRoute;
