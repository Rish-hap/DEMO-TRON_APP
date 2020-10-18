import { GET_USER, GET_USER_RET, GET_USER_LOADING, SET_USER_DATA } from "../Constants"

export const get_user = (data) => {
    return {
        type:GET_USER,
        data
    }
}
export const get_user_ret = (data) => {
    return {
        type:GET_USER_RET,
        data
    }
}
export const get_user_loading = (data) => {
    return {
        type:GET_USER_LOADING,
        data
    }
}
export const set_user_data = (data) => {
    return {
        type:SET_USER_DATA,
        data
    }
}