import { auth } from "../../firebase/firebase";
import * as actionTypes from "./actionTypes";

export const startSignin = (credentials) =>{
    console.log(credentials);
    return (dispatch)=>{
        dispatch({type:actionTypes.PROCESSING})
        auth
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((data)=>{
            console.log(data);
            dispatch({type:actionTypes.SIGNIN_SUCCESS})
        })
        .catch((err)=>{
            dispatch({type: actionTypes.SIGNIN_FAILED, message: err.message})
        })
    }
};

export const startSignout = () =>{
    return (dispatch)=>{
        auth.signOut().then(()=>{
            dispatch({type: actionTypes.SIGNOUT_SUCCESS})
        })
        .catch((err)=>{
            dispatch({type:actionTypes.SIGNOUT_FAILED, message: err.message})
        })
    }
};