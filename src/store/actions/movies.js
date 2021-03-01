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
          if (doc.id !== "poster") {
            movieList.push({ ...doc.data(), id: doc.id });
          }
        });
      })
      .then(() => {
        dispatch({ type: actionTypes.FETCH_MOVIES, movieList });
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
        dispatch({
          type: actionTypes.FETCH_MOVIE_INFO,
          movieInfo: snapshot.data(),
        });
      });
  };
};

export const updateMovieInfo = (data) => {
  return () => {
    firestore
      .collection("movies")
      .doc(data.id)
      .update({
        name: data.name,
        info: data.info,
        writer: data.writer,
        director: data.director,
        releasedDate: data.releasedDate,
        year: data.year,
        duration: data.duration,
        casts: data.casts,
      })
      .then(() => {
        alert("Updated Successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const deleteMovie = (id) => {
  firestore
    .collection("movies")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document has been Deleted");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const addMovie = (data) => {
  firestore
    .collection("movies")
    .add({
      name: data.name,
      info: data.info,
      writer: data.writer,
      director: data.director,
      releasedDate: data.releasedDate,
      year: data.year,
      duration: data.duration,
      casts: data.casts,
      poster: data.poster,
      banner: data.banner
    })
    .then(() => {
      console.log("Document has been Deleted");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
