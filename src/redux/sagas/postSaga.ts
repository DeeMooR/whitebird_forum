import { PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { takeLatest, put } from 'redux-saga/effects';
import { deletePostInPostPage, deletePostInPostPageFailure, deletePostInPostPageSuccess, getPost, getPostSuccess, setPostsErrorMessage, setPostsSuccessMessage, updatePostInPostPage, updatePostInPostPageFailure, updatePostInPostPageSuccess } from '../slices';
import { deletePostApi, getCommentsApi, getPostApi, getUsersApi, updatePostApi } from '../api/postApi';
import { IComment, IPost, IUser } from 'src/interfaces';
import { getControlsPost } from 'src/controlsPostsData';

interface IGetPostSaga {
  postId: number,
  navigate: NavigateFunction
}

interface IDeletePostSaga {
  postId: number,
  navigate: NavigateFunction
}

function* getPostSaga({ payload }: PayloadAction<IGetPostSaga>) {
  try {
    const { postId } = payload;
    const post: IPost = yield getPostApi(postId);
    const comments: IComment[] = yield getCommentsApi(postId);
    const users: IUser[] = yield getUsersApi(post.userId);
    const user = users[0];
    
    const controls = getControlsPost(postId);
    yield put(getPostSuccess({post, user, comments, controls}));
  } catch (error) {
    yield put(setPostsErrorMessage('Ошибка загрузки поста'));
    payload.navigate('/forum');
  }
}

function* updatePostInPostPageSaga({ payload }: PayloadAction<IPost>) {
  try {
    const { id, comments_number, ...post } = payload;
    const changedPost: IPost = yield updatePostApi(id, post);
    yield put(updatePostInPostPageSuccess(changedPost));
  } catch (error) {
    yield put(updatePostInPostPageFailure());
  }
}

function* deletePostInPostPageSaga({ payload }: PayloadAction<IDeletePostSaga>) {
  try {
    const { postId, navigate } = payload;
    yield deletePostApi(postId);
    yield put(deletePostInPostPageSuccess());
    yield put(setPostsSuccessMessage('Пост успешно удалён'))
    navigate('/forum');
  } catch (error) {
    yield put(deletePostInPostPageFailure());
  }
}

export function* postSaga() {
  yield takeLatest(getPost, getPostSaga);
  yield takeLatest(updatePostInPostPage, updatePostInPostPageSaga);
  yield takeLatest(deletePostInPostPage, deletePostInPostPageSaga);
}