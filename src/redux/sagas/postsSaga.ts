import { takeLatest, put, select } from 'redux-saga/effects';
import { getPosts, getPostsSuccess, getPostsFailure, getPostsByUser, getPostsByUserSuccess, getPostsByUserFailure, getMyPosts, getMyPostsSuccess, getMyPostsFailure, updatePost, deletePost, updatePostSuccess, updatePostFailure, deletePostSuccess, deletePostFailure, createPost, createPostSuccess, createPostFailure } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IPost, IUser } from 'src/interfaces';
import { getUserSelector } from '../selectors';
import { IUserState } from '../interfaces';

interface IGetMyPostsSaga {
  payload: string;
}

interface IGetPostsByUserSaga {
  payload: string;
}

interface ICreatePostSaga {
  payload: Pick<IPost, 'title' | 'body'>;
}

interface IUpdatePostSaga {
  payload: IPost;
}

interface IDeletePostSaga {
  payload: number;
}

function* getPostsSaga() {
  try {
    const posts: IPost[] = yield axiosInstance.get(endpoints.posts).then(({ data }) => data);
    const users: IUser[] = yield axiosInstance.get(endpoints.users).then(({ data }) =>
      data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
    );
    yield put(getPostsSuccess({posts, users}));
  } catch (error) {
    yield put(getPostsFailure());
  }
}

function* getMyPostsSaga({ payload: userId }: IGetMyPostsSaga) {
  try {
    const myPosts: IPost[] = yield axiosInstance.get(endpoints.posts, { params: { userId }}).then(({ data }) => data);
    const users: IUser[] = yield axiosInstance.get(endpoints.users).then(({ data }) =>
      data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
    );
    yield put(getMyPostsSuccess({myPosts, users}));
  } catch (error) {
    yield put(getMyPostsFailure());
  }
}

function* getPostsByUserSaga({ payload }: IGetPostsByUserSaga) {
  try {
    let posts: IPost[] = [];
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

function* createPostSaga({ payload }: ICreatePostSaga) {
  try {
    const { user }: IUserState = yield select(getUserSelector);
    const post = {
      userId: user.id,
      ...payload
    }
    const newPost: IPost = yield axiosInstance.post(endpoints.posts, post).then(({ data }) => data);
    yield put(createPostSuccess(newPost));
  } catch (error) {
    yield put(createPostFailure());
  }
}

function* updatePostSaga({ payload }: IUpdatePostSaga) {
  try {
    const { id, comments_number, ...post } = payload;
    const changedPost: IPost = yield axiosInstance.patch(`${endpoints.posts}/${id}`, post).then(({ data }) => data);
    yield put(updatePostSuccess(changedPost));
  } catch (error) {
    yield put(updatePostFailure());
  }
}

function* deletePostSaga({ payload: id }: IDeletePostSaga) {
  try {
    yield axiosInstance.delete(`${endpoints.posts}/${id}`);
    yield put(deletePostSuccess(id));
  } catch (error) {
    yield put(deletePostFailure());
  }
}

function* forumSaga() {
  yield takeLatest(getPosts, getPostsSaga);
  yield takeLatest(getMyPosts, getMyPostsSaga);
  yield takeLatest(getPostsByUser, getPostsByUserSaga);
  yield takeLatest(createPost, createPostSaga);
  yield takeLatest(updatePost, updatePostSaga);
  yield takeLatest(deletePost, deletePostSaga);
}

export default forumSaga;