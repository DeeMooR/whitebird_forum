import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import usersSaga from "./usersSaga";
import postsSaga from "./postsSaga";
import postSaga from "./postSaga";

export default function* rootSaga() {
  yield all([
    userSaga(), usersSaga(), postsSaga(), postSaga()
  ])
}