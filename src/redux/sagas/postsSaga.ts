import { takeLatest, put, select } from 'redux-saga/effects';
import { getPosts, getPostsSuccess, getPostsFailure, getPostsByUser, getPostsByUserSuccess, getPostsByUserFailure, getMyPosts, getMyPostsSuccess, getMyPostsFailure, updatePost, deletePost, updatePostSuccess, updatePostFailure, deletePostSuccess, deletePostFailure } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IComment, IPost, IUser } from 'src/interfaces';
import { getLocalCommentsSelector } from '../selectors';
import { addCommentsNumberToPosts } from 'src/config';

interface IGetMyPostsSaga {
  payload: string;
}

interface IGetPostsByUserSaga {
  payload: string;
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

    const localComments: IComment[] = yield select(getLocalCommentsSelector);
    const postsWithComments: IPost[] = yield addCommentsNumberToPosts(posts, localComments);
    yield put(getPostsSuccess({posts: postsWithComments, users}));
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

    const localComments: IComment[] = yield select(getLocalCommentsSelector);
    const postsWithComments: IPost[] = yield addCommentsNumberToPosts(myPosts, localComments);
    yield put(getMyPostsSuccess({myPosts: postsWithComments, users}));
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

    const localComments: IComment[] = yield select(getLocalCommentsSelector);
    const postsWithComments: IPost[] = yield addCommentsNumberToPosts(posts, localComments);
    yield put(getPostsByUserSuccess(postsWithComments));
  } catch (error) {
    yield put(getPostsByUserFailure());
  }
}

function* updatePostSaga({ payload }: IUpdatePostSaga) {
  try {
    const { id, comments_number, ...post } = payload;
    const changedPost: IPost = yield axiosInstance.patch(`${endpoints.posts}/${id}`, post).then(({ data }) => data);
    
    const localComments: IComment[] = yield select(getLocalCommentsSelector);
    const postsWithComments: IPost[] = yield addCommentsNumberToPosts([changedPost], localComments);
    yield put(updatePostSuccess(postsWithComments[0]));
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
  yield takeLatest(updatePost, updatePostSaga);
  yield takeLatest(deletePost, deletePostSaga);
}

export default forumSaga;