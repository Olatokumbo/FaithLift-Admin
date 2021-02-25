import * as actionTypes from "../actions/actionTypes";
const initialState = {
  articleList: [],
  articleInfo: null
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
    default:
      return state;
  }
};

export default articleReducer;
