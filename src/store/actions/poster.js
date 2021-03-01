import * as actionTypes from "./actionTypes";
import { firestore, storage } from "../../firebase/firebase";

export const fetchPoster = () => {
    return (dispatch) => {
      firestore
        .collection("movies")
        .doc("poster")
        .get()
        .then((snapshot) => {
          dispatch({
            type: actionTypes.FETCH_POSTER,
            posterInfo: snapshot.data(),
          });
        });
    };
  };

  export const updatePoster = (data) => {
    return () => {
      firestore
        .collection("movies")
        .doc("poster")
        .update({
         title: data.title,
         info: data.info,
         youtubeUrl: data.youtubeUrl,
         movieId: data.movieId
        })
        .then(() => {
          alert("Updated Successfully");
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  };


  export const updatePosterWithImage = (data) => {
    return (dispatch) => {
      dispatch({type: actionTypes.UPLOAD_POSTER});
      const name = Date.now().toString();
      let uploadTask = storage.ref(`posters/${name}`).put(data.poster);
  
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
            .ref("posters")
            .child(name) //image.name
            .getDownloadURL()
            .then((url) => {
              //  Add your firestore query here
              firestore
                .collection("movies")
                .doc("poster")
                .update({
                    title: data.title,
                    info: data.info,
                    youtubeUrl: data.youtubeUrl,
                    movieId: data.movieId,
                    poster: url
                   })
                .then(() => {
                  dispatch({
                    type: actionTypes.UPDATE_POSTER_SUCCESS,
                    message: "Poster Info Has Been Update",
                  });
                  alert("Poster Info Has Been Update");
                })
                .catch((err) => {
                  dispatch({
                    type: actionTypes.UPDATE_POSTER_FAILED,
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