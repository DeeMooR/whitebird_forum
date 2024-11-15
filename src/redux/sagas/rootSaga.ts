import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import forumSaga from "./forumSaga";
import usersSaga from "./usersSaga";

export default function* rootSaga() {
  yield all([
    userSaga(), forumSaga(), usersSaga()
  ])
}