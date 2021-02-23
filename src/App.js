import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import "./App.css"
const App = () => {
  return (
    <Router>
      <Switch>
          <Route to="/" component={Signin} />
      </Switch>
    </Router>
  );
};

export default App;
