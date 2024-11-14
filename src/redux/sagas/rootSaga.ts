import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import forumSaga from "./forumSaga";

export default function* rootSaga() {
  yield all([
    userSaga(), forumSaga()
  ])
}