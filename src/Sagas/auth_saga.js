import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {  LOGIN, LOGOUT } from '../Constants'
import { login_ret, login_loading,logout_ret } from '../actions/Auth'
import api from '../utils/api_routes'
import { get_url_params } from "../utils/common_utilities"
import store from '../store'


// worker Saga: will be fired on USER_FETCH_REQUESTED actions

function* logout_saga() {
    console.log("Inside logout_saga")

   try {
      const  data = yield store.getState().auth_store.logout
      const headers = {
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`,
        },
      }
  localStorage.removeItem('token')
  window.location.reload()
    //   const api_data = yield call(api.auth.initiation_payment, data, headers)
    const api_data = {
        success:true,
        message:'Logout Successfull'
    }
      console.log(api_data,"api_data ")
      if(!!api_data){
            if(api_data.success){
                yield put(logout_ret({
                    success:true,
                    message:api_data.message || "Amount Successfully deposited",
                    data:api_data.result
                   }))
            }else{
                yield put(logout_ret({
                    success:false,
                    message:api_data.message ||'Something went wrong try again later..',
                    data:[]
                   }))
            }
      }else{
        yield put(logout_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
      }
   } catch (e) {
    console.log(e.response,"e in signup_saga")
    try{
        yield put(logout_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
      }catch(x){
        yield put(logout_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
        }
   }
}


function* login_saga() {
    console.log("Inside signup_saga")

   try {
      const  data = yield store.getState().auth_store.login
      const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }

    //   const api_data = yield call(api.auth.login, data, headers)
    const api_data = {
        success:false,
        message:"No api  connected"
    }
      console.log(api_data,"api_data ")
      if(!!api_data){
            if(api_data.success){
                yield put(login_ret({
                    success:true,
                    message:api_data.message || "Login successfull",
                    data:api_data.result
                   }))
            }else{
                yield put(login_ret({
                    success:false,
                    message:api_data.message ||'Something went wrong try again later..',
                    data:[]
                   }))
            }
      }else{
        yield put(login_loading({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
      }
   } catch (e) {
    console.log(e.response,"e in signup_saga")
    try{
        yield put(login_loading({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
      }catch(x){
        yield put(login_loading({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
        }
   }
}


export const auth_saga = [
   takeLatest(LOGIN, login_saga),
   takeLatest(LOGOUT, logout_saga)
]

export default auth_saga