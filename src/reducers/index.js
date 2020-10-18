import { combineReducers } from 'redux';

import userReducer from './userReducer';
import  authReducer from './authReducer';
import  globalReducer from './global_reducer'


export default combineReducers({
  user_store : userReducer,
  auth_store:authReducer,
  global_store:globalReducer
})
