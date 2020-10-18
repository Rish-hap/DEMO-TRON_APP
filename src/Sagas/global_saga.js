import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {   GLOBAL_ERROR } from '../Constants'
import { global_error_ret, global_error_clr } from '../actions/global'
import api from '../utils/api_routes'
import { get_url_params } from "../utils/common_utilities"
import store from '../store'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* global_error_saga() {

   try {
      const  data = yield store.getState().global_store.global_error
      const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
     
      yield put(global_error_ret({
        success:data.success,
        message:data.message,
        heading:data.heading,
        data:data.data
       }))
   } catch (e) {
    console.log(e.response,"e in global_error_saga")
   }
}

export const global_saga = [
   takeLatest(GLOBAL_ERROR, global_error_saga)
]

export default global_saga