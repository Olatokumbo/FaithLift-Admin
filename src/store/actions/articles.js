import * as actionTypes from "./actionTypes"; 
import { firestore } from "../../firebase/firebase";

export const fetchArticles = () => {
    return (dispatch)=>{
        let articleList = [];
     firestore
     .collection("articles")
     .get()
     .then((querySnapShot)=>{
        querySnapShot.forEach((doc)=>{
            articleList.push({...doc.data(), id: doc.id })
        })
     }).then(()=>{
        dispatch({type: actionTypes.FETCH_ARTICLES, articleList });
     })   
    }
}

export const fetchArticleInfo = (id) => {
    return (dispatch) => {
      firestore
        .collection("articles")
        .doc(id)
        .get()
        .then((snapshot) => {
          dispatch({type: actionTypes.FETCH_ARTICLE_INFO, articleInfo: snapshot.data()})
        });
    };
  };

