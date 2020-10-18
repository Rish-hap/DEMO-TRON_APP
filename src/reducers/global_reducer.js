import {  GLOBAL_ERROR , GLOBAL_ERROR_RET, GLOBAL_ERROR_CLR, GLOBAL_LOADING, GLOBAL_LOADING_CLR} from "../Constants"
import { act } from "react-dom/test-utils"

const initialState = {
    global_error:false,
    global_error_ret:false,
    global_error_loading:false,

    global_loading:false

}

export default function (state = initialState, action) {
    switch (action.type) {
        case GLOBAL_LOADING:
            return {
                ...state,
                global_loading:true
            }
        case GLOBAL_LOADING_CLR:
            return {
                ...state,
                global_loading:false
            }
        case GLOBAL_ERROR:
             return {
               ...state,
               global_error:action.data,
               global_error_loading:true
             }
        case GLOBAL_ERROR_RET:
        return {
            ...state,
            global_error_ret:action.data,
            // signup_loading:true,
            global_error_loading:false
        }
        case GLOBAL_ERROR_CLR:
            return {
                ...state,
                global_error_ret:false,
                global_error_loading:false
            }
        default:
        return {...state}
    
        }
}