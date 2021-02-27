import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyA7Og8LVopQN2JBGJ4-0w7mBARcZHF3hys",
    authDomain: "faithlift-20.firebaseapp.com",
    projectId: "faithlift-20",
    storageBucket: "faithlift-20.appspot.com",
    messagingSenderId: "986346831788",
    appId: "1:986346831788:web:f20644543bec076b814409",
    measurementId: "G-YVXGKT9M0H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const auth = firebase.auth();

  export {firebase as default, storage, firestore, auth}