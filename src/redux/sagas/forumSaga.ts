import { takeLatest, put } from 'redux-saga/effects';
import { getPosts, getPostsSuccess, getPostsFailure } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IPost } from 'src/interfaces';

function* getPostsSaga() {
  try {
    const posts: IPost[] = yield axiosInstance.get(endpoints.posts).then(({ data }) => data);
    yield put(getPostsSuccess(posts));
  } catch (error) {
    yield put(getPostsFailure());
  }
}

function* forumSaga() {
  yield takeLatest(getPosts, getPostsSaga);
}

export default forumSaga;