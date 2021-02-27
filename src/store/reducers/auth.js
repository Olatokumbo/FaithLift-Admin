import * as actionTypes from "../actions/actionTypes";
const initialState = {
    auth: false,
    message: null,
    isLoading:false
}

const authReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.PROCESSING:
            return{
                isLoading: true
            }
        case actionTypes.SIGNIN_SUCCESS:
            return{
                ...state,
                auth: true,
                message:null,
                isLoading: false
            }
        case actionTypes.SIGNIN_FAILED:
            return{
                ...state,
                auth: false,
                message: action.message,
                isLoading: false
            }
        case actionTypes.SIGNOUT_SUCCESS:
            return{
                ...state,
                auth: false,
                message: null,
                isLoading: false
            }
        case actionTypes.SIGNOUT_FAILED:
            return{
                ...state,
                message: action.message,
                isLoading: false
            }
        default:
            return state;
    }
}

export default authReducer;