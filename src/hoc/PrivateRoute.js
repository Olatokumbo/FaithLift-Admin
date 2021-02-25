import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) =>(
    <Route
    {...rest}
    component={(props) =>
      true ? (
        <div>
          <Navbar/>
            <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
)


export default PrivateRoute;