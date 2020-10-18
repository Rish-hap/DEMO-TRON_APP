import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {  GET_USER } from '../Constants'
import { get_user_ret, get_user_loading } from '../actions/user'
import api from '../utils/api_routes'
import { get_url_params } from "../utils/common_utilities"
import store from '../store'

console.log(store,"store in saga file")

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* get_user_saga() {
    console.log("Inside get_user_saga")

   try {
      const  data = yield store.getState().user_store.get_user
      const headers = {
         headers: {
           Authorization: `bearer ${localStorage.getItem('token')}`,
         },
       }
       const api_data = yield call(api.user.get_user,  headers)
      console.log(api_data,"api_data in get_usersaga")
      if(!!api_data){
         if(api_data.success){
            yield put(get_user_ret({
                success:true,
                message:api_data.message || "User successfully fetched",
                data:api_data.data
               }))
        }else{
            yield put(get_user_ret({
                success:false,
                message:api_data.message ||'Something went wrong try again later..',
                data:[]
               }))
        }
      }
   } catch (e) {
    console.log(e,"e in get_act insigt saga")
    try{
        yield put(get_user_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
      }catch(x){
        yield put(get_user_loading({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
        }
   }
}



export const user_saga = [
   takeLatest(GET_USER, get_user_saga)
]

export default user_saga