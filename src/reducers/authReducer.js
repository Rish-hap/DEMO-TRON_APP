import {  LOGIN, LOGIN_RET, LOGIN_LOADING, LOGOUT_RET, LOGOUT, LOGOUT_CLR } from "../Constants"

const initialState = {


    login:false,
    login_ret:false,
    login_loading:false,

    logout:false,
    logout_ret:false,
    logout_loading:false,
}

export default function (state = initialState, action) {
    switch (action.type) {

        case LOGOUT:
            return {
              ...state,
              logout:action.data,
              logout_loading:true
            }
       case LOGOUT_RET:
       return {
           ...state,
           logout_ret:action.data,
           // signup_loading:true
       }
       case LOGOUT_CLR:
           return {
               ...state,
               logout_ret:false,
               logout_loading:false
           }

        case LOGIN:
            return {
                ...state,
                login:action.data,
                login_loading:true
            }
        case LOGIN_RET:
        return {
            ...state,
            login_ret:action.data,
            // signup_loading:true
        }
        case LOGIN_LOADING:
            return {
                ...state,
                login_ret:false,
                login_loading:false
            }
        default:
        return {...state}
    
        }
}