import * as actionTypes from "./actionTypes"; 
import firebase, { firestore, storage } from "../../firebase/firebase";

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
    return ()=>{
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
  } 


  export const addArticle = (article) => {
    return (dispatch) => {
      dispatch({type: actionTypes.UPLOAD_ARTICLE});
      const name = Date.now().toString();
      let uploadTask = storage.ref(`articles/${name}`).put(article.poster);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // dispatch({type:actionTypes.PROGRESS, progress});
          // console.log(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref("articles")
            .child(name) //image.name
            .getDownloadURL()
            .then((url) => {
              //  Add your firestore query here
              firestore
                .collection("articles")
                .add({
                  title: article.title,
                  message: article.message,
                  category: article.category,
                  publishedDate: firebase.firestore.FieldValue.serverTimestamp(),
                  poster: url
                })
                .then(() => {
                  dispatch({
                    type: actionTypes.ADD_ARTICLE_SUCCESS,
                    message: "New Article has been posted",
                  });
                  alert("New Article has been posted");
                })
                .catch((err) => {
                  dispatch({
                    type: actionTypes.ADD_ARTICLE_FAILED,
                    message: err.message,
                  });
                  alert(err.message);
                });
  
              // console.log(url)
            });
        }
      );
    };
  };