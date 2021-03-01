import * as actionTypes from "../actions/actionTypes";
const initialState = {
  posterInfo: null,
  message: null,
  successUpload: null,
  loading: false,
};

const posterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTER:
      return {
        ...state,
        posterInfo: action.posterInfo,
      };
    case actionTypes.UPLOAD_POSTER:
      return {
        ...state,
        loading: true
      };
    case actionTypes.UPDATE_POSTER_SUCCESS:
      return {
        ...state,
        successUpload: true,
        loading: false,
        message: action.message,
      };
    case actionTypes.UPDATE_POSTER_FAILED:
      return {
        ...state,
        successUpload: false,
        loading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default posterReducer;
