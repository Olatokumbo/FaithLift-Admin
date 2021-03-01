import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { movieReducer, authReducer, posterReducer } from "./store/reducers";
import { auth } from "./firebase/firebase";
import * as actionTypes from "./store/actions/actionTypes";
import App from "./App";
import articleReducer from "./store/reducers/articles";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  movies: movieReducer,
  articles: articleReducer,
  auth: authReducer,
  poster: posterReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

auth.onAuthStateChanged((user) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
if (user) {
  console.log("Signed in", user);
  store.dispatch({ type: actionTypes.SIGNIN_SUCCESS, auth: true });
  
} else {
  console.log("Signed out");
}
});
