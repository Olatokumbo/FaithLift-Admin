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

  export const updateArticleInfo = (data) => {
    return () => {
      firestore
        .collection("articles")
        .doc(data.id)
        .update({
          title: data.title,
          message: data.message
        })
        .then(() => {
          alert("Updated Successfully");
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  };
  
  export const deleteArticle = (id) => {
    firestore
    .collection("articles")
    .doc(id)
    .delete()
    .then(()=>{
      alert("Document has been Deleted")
    })
    .catch((err) => {
      console.log(err.message);
    });
  } 
