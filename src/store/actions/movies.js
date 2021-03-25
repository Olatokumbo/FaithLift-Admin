import * as actionTypes from "./actionTypes";
import { firestore, storage } from "../../firebase/firebase";

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
  return ()=>{
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
  }
};

export const addMovie = (data) => {
  console.log("Adding Movie...");
  return (dispatch) => {
    dispatch({ type: actionTypes.UPLOAD_MOVIE });
    const promises = [];
    const imageUrls = [];
    data.images.forEach((image, index) => {
      const name = Date.now().toString() + Math.random(3).toFixed(3);
      let uploadTask = storage.ref(`movies/${name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // dispatch({type:actionTypes.PROGRESS, progress});
          console.log(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        async () => {
          storage
            .ref("movies")
            .child(name) //image.name
            .getDownloadURL()
            .then((url) => {
              //  Add your firestore query here
              console.log(url);
              imageUrls.push(url);
              console.log('index', index);
              if(index===1){
                console.log('Save To Db')
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
                  poster: imageUrls[0],
                  coverPhoto: imageUrls[1],
                })
                .then(() => {
                  dispatch({
                    type: actionTypes.ADD_MOVIE_SUCCESS,
                    message: "New Article has been posted",
                  });
                  alert("A new movie has been Added");
                })
                .catch((err) => {
                  dispatch({
                    type: actionTypes.ADD_MOVIE_FAILED,
                    message: err.message,
                  });
                  alert(err.message);
                });
              }
            });
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        console.log("Upload complete")
      })
      .catch((err) => console.log(err.code));
  };
};

// const onUploadSubmission = e => {
//   e.preventDefault(); // prevent page refreshing
//     const promises = [];
//     files.forEach(file => {
//      const uploadTask =
//       firebase.storage().ref().child(`your/file/path/${file.name}`).put(file);
//         promises.push(uploadTask);
//         uploadTask.on(
//            firebase.storage.TaskEvent.STATE_CHANGED,
//            snapshot => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//                if (snapshot.state === firebase.storage.TaskState.RUNNING) {
//                 console.log(`Progress: ${progress}%`);
//                }
//              },
//              error => console.log(error.code),
//              async () => {
//                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
//                 // do something with the url
//               }
//              );
//            });
//        Promise.all(promises)
//         .then(() => alert('All files uploaded'))
//         .catch(err => console.log(err.code));
//  }

// firestore
// .collection("movies")
// .add({
//   name: data.name,
//   info: data.info,
//   writer: data.writer,
//   director: data.director,
//   releasedDate: data.releasedDate,
//   year: data.year,
//   duration: data.duration,
//   casts: data.casts,
//   poster: data.poster,
//   banner: data.banner
// })
// .then(() => {
//   console.log("Document has been Deleted");
// })
// .catch((err) => {
//   console.log(err.message);
// });
