import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Home from "./pages/Home/Home";
import "./App.css";
const App = () => {
  return (
    <Router>

      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
