import {LOGIN, LOGIN_RET, LOGIN_LOADING, LOGOUT, LOGOUT_CLR, LOGOUT_RET} from "../Constants"


export const logout = (data) => {
    return {
        type:LOGOUT,
        data
    }
}
export const logout_ret = (data) => {
    return {
        type:LOGOUT_RET,
        data
    }
}
export const logout_clr = (data) => {
    return {
        type:LOGOUT_CLR,
        data
    }
}
export const login = (data) => {
    return {
        type:LOGIN,
        data
    }
}
export const login_ret = (data) => {
    return {
        type:LOGIN_RET,
        data
    }
}
export const login_loading = (data) => {
    return {
        type:LOGIN_LOADING,
        data
    }
}

