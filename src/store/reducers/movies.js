import * as actionTypes from "../actions/actionTypes";
const initialState = {
  movieList: [],
  movieInfo: null,
  message: null,
  // progress: 0,
  successUpload: null,
  loading: false,
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
        movieInfo: action.movieInfo,
      };
    case actionTypes.UPLOAD_MOVIE:
      return {
        ...state,
        loading: true,
      };
    // case actionTypes.PROGRESS:
    //   return {
    //     ...state,
    //     progress: action.progress,
    //   };
    case actionTypes.ADD_MOVIE_SUCCESS:
      return {
        ...state,
        successUpload: true,
        loading: false,
        message: action.message,
      };
    case actionTypes.ADD_MOVIE_FAILED:
      return {
        ...state,
        successUpload: false,
        loading: false,
        message: action.message,
      };
    case actionTypes.RESET:
      return {
        ...state,
        loading: false,
        successUpload: null,
        message: null,
        progress: 0,
      };
    default:
      return state;
  }
};

export default movieReducer;
