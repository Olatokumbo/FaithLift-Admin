import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";
import MovieInfo from "./pages/MovieInfo/MovieInfo";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Signin} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/movies" component={Movies} />
        <PrivateRoute path="/movie/:id" component={MovieInfo} />
      </Switch>
    </Router>
  );
};

export default App;
