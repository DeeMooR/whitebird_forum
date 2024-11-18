import { PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { takeLatest, put, select } from 'redux-saga/effects';
import { createComment, createCommentFailure, createCommentSuccess, createLocalPost, createLocalPostFailure, createLocalPostSuccess, deleteComment, deleteCommentFailure, deleteCommentSuccess, deleteLocalPost, deleteLocalPostFailure, deleteLocalPostSuccess, updateComment, updateCommentFailure, updateCommentSuccess, updateLocalPost, updateLocalPostFailure, updateLocalPostSuccess, updatePostInPostPageSuccess, } from '../slices';
import { createCommentApi, createLocalPostApi, deleteCommentApi, deleteLocalPostApi, updateCommentApi, updateLocalPostApi } from '../api/localApi';
import { IComment, INewComment, IPost } from 'src/interfaces';
import { getLocalSelector, getPostSelector, getUserSelector } from '../selectors';
import { ILocalState, IPostState, IUserState } from '../interfaces';

interface IDeleteLocalPostSaga {
  postId: number,
  navigate: NavigateFunction
}

function* createCommentSaga({ payload }: PayloadAction<INewComment>) {
  try {
    const { commentsMaxId, posts: localPosts }: ILocalState = yield select(getLocalSelector);
    const { user, post }: IPostState = yield select(getPostSelector);

    const comment = {
      postId: post?.id,
      email: user?.email,
      ...payload
    }
    let newComment: IComment = yield createCommentApi(comment);
    newComment.id = commentsMaxId + 1;

    // обновление счётчика комментариев у поста
    let updatedPosts: IPost[] = localPosts.map(item => {
      return (item.id === post?.id) ? {...item, comments_number: item.comments_number! + 1} : item;
    })
    yield put(createCommentSuccess({newComment, updatedPosts}));
  } catch (error) {
    yield put(createCommentFailure());
  }
}

function* updateCommentSaga({ payload }: PayloadAction<IComment>) {
  try {
    const { id, ...comment } = payload;
    let changedComment: IComment = yield updateCommentApi(id, comment);
    changedComment.id = id;
    yield put(updateCommentSuccess(changedComment));
  } catch (error) {
    yield put(updateCommentFailure());
  }
}

function* deleteCommentSaga({ payload: id }: PayloadAction<number>) {
  try {
    const { user }: IPostState = yield select(getPostSelector);
    const { posts: localPosts }: ILocalState = yield select(getLocalSelector);
     // обновление счётчика комментариев у поста
    let updatedPosts: IPost[] = localPosts.map(item => {
      return (item.userId === user?.id) ? {...item, comments_number: item.comments_number! - 1} : item;
    })

    yield deleteCommentApi(id);
    yield put(deleteCommentSuccess({id, updatedPosts}));
  } catch (error) {
    yield put(deleteCommentFailure());
  }
}

function* createLocalPostSaga({ payload }: PayloadAction<Pick<IPost, 'title' | 'body'>>) {
  try {
    const { postsMaxId }: ILocalState = yield select(getLocalSelector);
    const { user }: IUserState = yield select(getUserSelector);
    const post = {
      userId: user.id,
      comments_number: 0,
      ...payload
    }
    const newPost: IPost = yield createLocalPostApi(post);
    newPost.id = postsMaxId + 1;
    yield put(createLocalPostSuccess(newPost));
  } catch (error) {
    yield put(createLocalPostFailure());
  }
}

function* updateLocalPostSaga({ payload }: PayloadAction<IPost>) {
  try {
    const { id, comments_number, ...obj } = payload;
    let changedPost: IPost = yield updateLocalPostApi(id, obj);
    changedPost.id = id;
    
    // получение актуального количества комментариев
    const { posts }: ILocalState = yield select(getLocalSelector);
    const localPost = posts.find(item => item.id === id);
    changedPost.comments_number = localPost!.comments_number;
    yield put(updateLocalPostSuccess(changedPost));

    const { post }: IPostState = yield select(getPostSelector);
    // если запрос был отправлен со страницы PostPage, обновить соответствующий state
    if (post?.id === id) yield put(updatePostInPostPageSuccess(changedPost));
  } catch (error) {
    yield put(updateLocalPostFailure());
  }
}

function* deleteLocalPostSaga({ payload }: PayloadAction<IDeleteLocalPostSaga>) {
  try {
    const { postId, navigate } = payload;
    yield deleteLocalPostApi(postId);
    yield put(deleteLocalPostSuccess(postId));

    const { post }: IPostState = yield select(getPostSelector);
    // если запрос был отправлен со страницы PostPage, перенаправить пользователя на '/forum'
    if (post?.id === postId) navigate('/forum');
  } catch (error) {
    yield put(deleteLocalPostFailure());
  }
}

export function* localSaga() {
  yield takeLatest(createComment, createCommentSaga);
  yield takeLatest(updateComment, updateCommentSaga);
  yield takeLatest(deleteComment, deleteCommentSaga);
  yield takeLatest(createLocalPost, createLocalPostSaga);
  yield takeLatest(updateLocalPost, updateLocalPostSaga);
  yield takeLatest(deleteLocalPost, deleteLocalPostSaga);
}