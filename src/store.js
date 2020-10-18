import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers';
import rootSaga from "./Sagas/index.js"
import  { logout } from "./actions/Auth"
import { LOGOUT } from "./Constants"
const initialState = {};
const sagaMiddleware = createSagaMiddleware()

const invalidTokenMiddleWare = store=> next=> action=>{
  if(true){
      if(!!action.payload){
         if((!!(action.data.message==="Please authenticate") ))
          {
              store.dispatch({
                type:LOGOUT
              })
              next(logout)
          }else{
                  next(action)
          }
      }else if(!!action.data){
          if((!!(action.data.message==="Please authenticate")  ))
          {
            store.dispatch({
              type:LOGOUT
            })
            next(logout())
          }else{
                  next(action)
          }
      }else{
          next(action);
      }
  }else{
      next(action);
  }

}
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware, invalidTokenMiddleWare),
  )
);

// then run the saga
sagaMiddleware.run(rootSaga)


export default store;
