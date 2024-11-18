import { all } from "redux-saga/effects";
import { localSaga, postSaga, postsSaga, userSaga, usersSaga } from ".";

export default function* rootSaga() {
  yield all([
    userSaga(), usersSaga(), postsSaga(), postSaga(), localSaga()
  ])
}