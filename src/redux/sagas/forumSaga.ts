import { takeLatest, put } from 'redux-saga/effects';
import { getPosts, getPostsSuccess, getPostsFailure, getPostsByUser, getPostsByUserSuccess, getPostsByUserFailure } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IPostForum, IUser } from 'src/interfaces';

interface IGetPostsByUserSaga {
  payload: string;
}

function* getPostsSaga() {
  try {
    const posts: IPostForum[] = yield axiosInstance.get(endpoints.posts).then(({ data }) => data);
    const users: IUser[] = yield axiosInstance.get(endpoints.users).then(({ data }) =>
      data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
    );
    yield put(getPostsSuccess({posts, users}));
  } catch (error) {
    yield put(getPostsFailure());
  }
}

function* getPostsByUserSaga({ payload }: IGetPostsByUserSaga) {
  try {
    let posts: IPostForum[] = [];
    let users: IUser[] = yield axiosInstance.get(endpoints.users, { params: { username: payload }}).then(({ data }) =>
      data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
    );
    if (!users.length) {
      users = yield axiosInstance.get(endpoints.users, { params: { email: payload }}).then(({ data }) =>
        data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
      );
    }
    if (users.length) {
      const userId = users[0].id;
      posts = yield axiosInstance.get(endpoints.posts, { params: { userId }}).then(({ data }) => data);
    }
    yield put(getPostsByUserSuccess(posts));
  } catch (error) {
    yield put(getPostsByUserFailure());
  }
}

function* forumSaga() {
  yield takeLatest(getPosts, getPostsSaga);
  yield takeLatest(getPostsByUser, getPostsByUserSaga);
}

export default forumSaga;