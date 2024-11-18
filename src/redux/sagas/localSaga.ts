import { takeLatest, put, select } from 'redux-saga/effects';
import { createComment, createCommentFailure, createCommentSuccess, createLocalPost, createLocalPostFailure, createLocalPostSuccess, deleteComment, deleteCommentFailure, deleteCommentSuccess, deleteLocalPost, deleteLocalPostFailure, deleteLocalPostSuccess, updateComment, updateCommentFailure, updateCommentSuccess, updateLocalPost, updateLocalPostFailure, updateLocalPostSuccess, updatePostInPostPageSuccess, } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IComment, INewComment, IPost } from 'src/interfaces';
import { getLocalCommentsSelector, getLocalSelector, getPostSelector, getUserSelector } from '../selectors';
import { ILocalState, IPostState, IUserState } from '../interfaces';
import { NavigateFunction } from 'react-router-dom';

interface ICreateCommentSaga {
  payload: INewComment;
}

interface IUpdateCommentSaga {
  payload: IComment;
}

interface IDeleteCommentSaga {
  payload: number;
}

interface ICreateLocalPostSaga {
  payload: Pick<IPost, 'title' | 'body'>;
}

interface IUpdateLocalPostSaga {
  payload: IPost;
}

interface IDeleteLocalPostSaga {
  payload: {
    postId: number,
    navigate: NavigateFunction
  };
}

function* createCommentSaga({ payload }: ICreateCommentSaga) {
  try {
    const { commentsMaxId, posts: localPosts }: ILocalState = yield select(getLocalSelector);
    const { user, post }: IPostState = yield select(getPostSelector);
    const comment = {
      postId: post?.id,
      email: user?.email,
      ...payload
    }
    let newComment: IComment = yield axiosInstance.post(endpoints.comments, comment).then(({ data }) => data);
    newComment.id = commentsMaxId + 1;
    
    let updatedPosts: IPost[] = localPosts.map(item => {
      return (item.userId === user?.id) ? {...item, comments_number: item.comments_number! + 1} : item;
    })
    yield put(createCommentSuccess({newComment, updatedPosts}));
  } catch (error) {
    yield put(createCommentFailure());
  }
}

function* updateCommentSaga({ payload }: IUpdateCommentSaga) {
  try {
    const { id, ...comment } = payload;
    let changedComment: IComment = yield axiosInstance.patch(`${endpoints.comments}/${id}`, comment).then(({ data }) => data);
    changedComment.id = id;
    yield put(updateCommentSuccess(changedComment));
  } catch (error) {
    yield put(updateCommentFailure());
  }
}

function* deleteCommentSaga({ payload: id }: IDeleteCommentSaga) {
  try {
    const { user }: IPostState = yield select(getPostSelector);
    const { posts: localPosts }: ILocalState = yield select(getLocalSelector);
    let updatedPosts: IPost[] = localPosts.map(item => {
      return (item.userId === user?.id) ? {...item, comments_number: item.comments_number! - 1} : item;
    })

    yield axiosInstance.delete(`${endpoints.comments}/${id}`);
    yield put(deleteCommentSuccess({id, updatedPosts}));
  } catch (error) {
    yield put(deleteCommentFailure());
  }
}

function* createLocalPostSaga({ payload }: ICreateLocalPostSaga) {
  try {
    const { user }: IUserState = yield select(getUserSelector);
    const post = {
      userId: user.id,
      comments_number: 0,
      ...payload
    }
    const newPost: IPost = yield axiosInstance.post(endpoints.posts, post).then(({ data }) => data);
    yield put(createLocalPostSuccess(newPost));
  } catch (error) {
    yield put(createLocalPostFailure());
  }
}

function* updateLocalPostSaga({ payload }: IUpdateLocalPostSaga) {
  try {
    const { id, comments_number, ...localPost } = payload;
    let changedPost: IPost = yield axiosInstance.patch(`${endpoints.posts}/${id}`, localPost).then(({ data }) => data);
    changedPost.id = id;
    changedPost.comments_number = comments_number;

    const { post }: IPostState = yield select(getPostSelector);
    if (post?.id === id) yield put(updatePostInPostPageSuccess(changedPost));
    yield put(updateLocalPostSuccess(changedPost));
  } catch (error) {
    yield put(updateLocalPostFailure());
  }
}

function* deleteLocalPostSaga({ payload }: IDeleteLocalPostSaga) {
  try {
    const { postId, navigate } = payload;
    yield axiosInstance.delete(`${endpoints.posts}/${postId}`);
    yield put(deleteLocalPostSuccess(postId));

    const { post }: IPostState = yield select(getPostSelector);
    if (post?.id === postId) navigate('/forum');
  } catch (error) {
    yield put(deleteLocalPostFailure());
  }
}

function* forumSaga() {
  yield takeLatest(createComment, createCommentSaga);
  yield takeLatest(updateComment, updateCommentSaga);
  yield takeLatest(deleteComment, deleteCommentSaga);
  yield takeLatest(createLocalPost, createLocalPostSaga);
  yield takeLatest(updateLocalPost, updateLocalPostSaga);
  yield takeLatest(deleteLocalPost, deleteLocalPostSaga);
}

export default forumSaga;