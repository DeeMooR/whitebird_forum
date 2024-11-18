import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, select } from 'redux-saga/effects';
import { getPosts, getPostsSuccess, getPostsFailure, getPostsByUser, getPostsByUserSuccess, getPostsByUserFailure, getMyPosts, getMyPostsSuccess, getMyPostsFailure, updatePost, deletePost, updatePostSuccess, updatePostFailure, deletePostSuccess, deletePostFailure } from '../slices';
import { deletePostApi, getPostsApi, getPostsByUserIdApi, getUsersApi, getUsersByEmailApi, getUsersByUsernameApi, updatePostApi } from '../api/postsApi';
import { IComment, IPost, IUser } from 'src/interfaces';
import { getLocalCommentsSelector, getLocalPostsSelector } from '../selectors';
import { addCommentsNumberToPosts } from 'src/config';

function* getPostsSaga() {
  try {
    const posts: IPost[] = yield getPostsApi();
    const users: IUser[] = yield getUsersApi();
    // добавление к каждому посту comments_number
    const localComments: IComment[] = yield select(getLocalCommentsSelector);
    const postsWithComments: IPost[] = yield addCommentsNumberToPosts(posts, localComments);

    // добавление новых постов ко всем
    const localPosts: IPost[] = yield select(getLocalPostsSelector);
    const allPosts = [...localPosts, ...postsWithComments];

    // добавление к каждому посту priority
    const allPostsWithPriority = allPosts.map(item => ({...item, priority: 1}));
    yield put(getPostsSuccess({posts: allPostsWithPriority, users}));
  } catch (error) {
    yield put(getPostsFailure());
  }
}

function* getMyPostsSaga({ payload: userId }: PayloadAction<number>) {
  try {
    const myPosts: IPost[] = yield getPostsByUserIdApi(userId);
    const users: IUser[] = yield getUsersApi();

    // добавление к каждому посту comments_number
    const localComments: IComment[] = yield select(getLocalCommentsSelector);
    const postsWithComments: IPost[] = yield addCommentsNumberToPosts(myPosts, localComments);
    yield put(getMyPostsSuccess({myPosts: postsWithComments, users}));
  } catch (error) {
    yield put(getMyPostsFailure());
  }
}

function* getPostsByUserSaga({ payload }: PayloadAction<string>) {
  try {
    let allPosts: IPost[] = [];
    let users: IUser[] = yield getUsersByUsernameApi(payload);
    if (!users.length) {
      users = yield getUsersByEmailApi(payload);
    }
    if (users.length) {
      const userId = users[0].id;
      const posts: IPost[] = yield getPostsByUserIdApi(userId);

      // добавление к каждому посту comments_number
      const localComments: IComment[] = yield select(getLocalCommentsSelector);
      const postsWithComments: IPost[] = yield addCommentsNumberToPosts(posts, localComments);
  
      // добавление новых постов ко всем
      const localPosts: IPost[] = yield select(getLocalPostsSelector);
      const localPostsByUser = localPosts.filter(item => item.userId === users[0].id)
      allPosts = [...localPostsByUser, ...postsWithComments];
    }
    yield put(getPostsByUserSuccess(allPosts));
  } catch (error) {
    yield put(getPostsByUserFailure());
  }
}

function* updatePostSaga({ payload }: PayloadAction<IPost>) {
  try {
    const { id, comments_number, ...post } = payload;
    const changedPost: IPost = yield updatePostApi(id, post);
    
    // добавление к посту comments_number
    const localComments: IComment[] = yield select(getLocalCommentsSelector);
    const postsWithComments: IPost[] = yield addCommentsNumberToPosts([changedPost], localComments);
    yield put(updatePostSuccess(postsWithComments[0]));
  } catch (error) {
    yield put(updatePostFailure());
  }
}

function* deletePostSaga({ payload: id }: PayloadAction<number>) {
  try {
    yield deletePostApi(id);
    yield put(deletePostSuccess(id));
  } catch (error) {
    yield put(deletePostFailure());
  }
}

export function* postsSaga() {
  yield takeLatest(getPosts, getPostsSaga);
  yield takeLatest(getMyPosts, getMyPostsSaga);
  yield takeLatest(getPostsByUser, getPostsByUserSaga);
  yield takeLatest(updatePost, updatePostSaga);
  yield takeLatest(deletePost, deletePostSaga);
}