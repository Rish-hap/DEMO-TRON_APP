import user_saga from "./user_saga"
import auth_saga from "./auth_saga"
import global_saga from "./global_saga"
import { takeEvery, all } from 'redux-saga/effects';

function *rootSaga() {
    yield all([
        ...user_saga,
        ...auth_saga,
        ...global_saga
    ])
  }

export default rootSaga