import React from "react";
import { Switch, Router, Route } from "react-router-dom";
import history from "./history";

// Importing Views
import LoginPage from "../views/login-page";
import ProfilePage from "../views/profile-page";

// Importing essential scripts
import { AuthProvider } from "./auth";
import PrivateRoute from "./private-route";

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <Route
            path={["/", "/login", "/signup", "/sign-up", "/sign-in", "/signin"]}
            exact
            component={LoginPage}
          />
          <PrivateRoute
            path={["/profile:handle"]}
            exact
            component={ProfilePage}
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
