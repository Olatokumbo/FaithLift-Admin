import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { connect } from "react-redux"
const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) =>(
    <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
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

const mapStateToProps = (state)=>{
  return{
    isAuthenticated: state.auth.auth
  }
}

export default connect(mapStateToProps)(PrivateRoute);