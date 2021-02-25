import * as actionTypes from "./actionTypes";
import { firestore } from "../../firebase/firebase";

export const fetchMovies = () => {
  return (dispatch) => {
    console.log("Fetching movies");
    let movieList = [];
    firestore
      .collection("movies")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
         if(doc.id !=="poster"){
            movieList.push({ ...doc.data(), id: doc.id });
         }
        });
      })
      .then(() => {
          dispatch({type: actionTypes.FETCH_MOVIES, movieList})
        movieList = [];
      });
  };
};

export const fetchMovieInfo = (id) => {
  return (dispatch) => {
    firestore
      .collection("movies")
      .doc(id)
      .get()
      .then((snapshot) => {
        dispatch({type: actionTypes.FETCH_MOVIE_INFO, movieInfo: snapshot.data()})
      });
  };
};
