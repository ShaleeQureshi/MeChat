import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./auth";
import LoginApp from "../views/login-page";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <LoginApp previousRoute={window.location.href} />
        )
      }
    />
  );
};
export default PrivateRoute;
