import { GLOBAL_ERROR, GLOBAL_ERROR_RET, GLOBAL_ERROR_CLR, GLOBAL_LOADING, GLOBAL_LOADING_CLR,
         LOGOUT, LOGOUT_RET, LOGOUT_CLR } from "../Constants"


export const global_loading_set = (data) => {
    return {
        type:GLOBAL_LOADING,
        data
    }
}
export const global_loading_clr = (data) => {
    return {
        type:GLOBAL_LOADING_CLR,
        data
    }
}
export const global_error = (data) => {
    return {
        type:GLOBAL_ERROR,
        data
    }
}
export const global_error_ret = (data) => {
    return {
        type:GLOBAL_ERROR_RET,
        data
    }
}
export const global_error_clr = (data) => {
    return {
        type:GLOBAL_ERROR_CLR,
        data
    }
}