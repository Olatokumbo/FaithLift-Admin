import { bindActionCreators } from "redux";

import * as actionTypes from "../actions/actionTypes";
const initialState = {
  movieList: [],
  movieInfo: null
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES:
      return {
        ...state,
        movieList: action.movieList,
      };
    case actionTypes.FETCH_MOVIE_INFO:
      return {
        ...state,
        movieInfo: action.movies,
      };
    default:
      return state;
  }
};

export default movieReducer;
