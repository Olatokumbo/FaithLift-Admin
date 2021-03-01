import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";
import MovieInfo from "./pages/MovieInfo/MovieInfo";
import Articles from "./pages/Articles/Articles";
import NewArticle from "./pages/NewArticle/NewArticle";
import "./App.css";
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import Poster from "./pages/Poster/Poster";
const App = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Signin} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/movies" component={Movies} />
        <PrivateRoute path="/movie/:id" component={MovieInfo} />
        <PrivateRoute path="/articles" component={Articles} />
        <PrivateRoute path="/article/:id" component={ArticleInfo} />
        <PrivateRoute path="/new/article" component={NewArticle} />
        <PrivateRoute path="/poster" component={Poster} />
      </Switch>
    </Router>
  );
};

export default App;
