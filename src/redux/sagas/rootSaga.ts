import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import postsSaga from "./postsSaga";
import usersSaga from "./usersSaga";

export default function* rootSaga() {
  yield all([
    userSaga(), postsSaga(), usersSaga()
  ])
}