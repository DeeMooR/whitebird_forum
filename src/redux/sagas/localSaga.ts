import { takeLatest, put, select } from 'redux-saga/effects';
import { createComment, createCommentFailure, createCommentSuccess, deleteComment, deleteCommentFailure, deleteCommentSuccess, updateComment, updateCommentFailure, updateCommentSuccess, } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IComment, INewComment } from 'src/interfaces';
import { getLocalSelector, getPostSelector } from '../selectors';
import { ILocalState, IPostState } from '../interfaces';

interface ICreateCommentSaga {
  payload: INewComment;
}

interface IUpdateCommentSaga {
  payload: IComment;
}

interface IDeleteCommentSaga {
  payload: number;
}

function* createCommentSaga({ payload }: ICreateCommentSaga) {
  try {
    const { maxId }: ILocalState = yield select(getLocalSelector);
    const { user, post }: IPostState = yield select(getPostSelector);
    const comment = {
      postId: post?.id,
      email: user?.email,
      ...payload
    }
    let newComment: IComment = yield axiosInstance.post(endpoints.comments, comment).then(({ data }) => data);
    newComment.id = maxId + 1;
    yield put(createCommentSuccess(newComment));
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
    yield axiosInstance.delete(`${endpoints.comments}/${id}`);
    yield put(deleteCommentSuccess(id));
  } catch (error) {
    yield put(deleteCommentFailure());
  }
}

function* forumSaga() {
  yield takeLatest(createComment, createCommentSaga);
  yield takeLatest(updateComment, updateCommentSaga);
  yield takeLatest(deleteComment, deleteCommentSaga);
}

export default forumSaga;