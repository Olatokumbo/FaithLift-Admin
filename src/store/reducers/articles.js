import * as actionTypes from "../actions/actionTypes";
const initialState = {
  articleList: [],
  articleInfo: null,
  message: null,
  progress: 0,
  successUpload: null,
  loading: false,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLES:
      return {
        ...state,
        articleList: action.articleList,
      };
    case actionTypes.FETCH_ARTICLE_INFO:
      return {
        ...state,
        articleInfo: action.articleInfo,
      };
    case actionTypes.UPLOAD_ARTICLE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };
    case actionTypes.ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        successUpload: true,
        loading: false,
        message: action.message,
      };
    case actionTypes.ADD_ARTICLE_FAILED:
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

export default articleReducer;
