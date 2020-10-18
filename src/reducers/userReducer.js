import { GET_USER, GET_USER_RET, GET_USER_LOADING, SET_USER_DATA } from "../Constants"
import { act } from "react-dom/test-utils"

const initialState = {
    get_user:false,
    get_user_ret:false,
    get_user_loading:false,

    user_data:{

    }
}

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_USER_DATA:{
            return {
                ...state,
                user_data:{...action.data}
            }
        }
        case GET_USER:
             return {
               ...state,
               get_user:action.data,
               get_user_loading:true
             }

        case GET_USER_RET:
            return {
            ...state,
            get_user_ret:action.data,
            get_user_loading:false
            }

        case GET_USER_LOADING:
        return {
        ...state,
        get_user_ret:false,
        get_user_loading:false
        }

        default:
        return {...state}
    
        }
}