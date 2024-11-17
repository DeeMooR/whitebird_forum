import { NavigateFunction } from 'react-router-dom';
import { takeLatest, put } from 'redux-saga/effects';
import { deletePostInPostPage, deletePostInPostPageFailure, deletePostInPostPageSuccess, getPost, getPostSuccess, setPostsErrorMessage, setPostsSuccessMessage, updatePostInPostPage, updatePostInPostPageFailure, updatePostInPostPageSuccess } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IComments, IPost, IUser } from 'src/interfaces';
import { getControlsPost } from 'src/controlsPostsData';

interface IGetPostSaga {
  payload: {
    postId: number,
    navigate: NavigateFunction
  };
}

interface IUpdatePostSaga {
  payload: IPost
}

interface IDeletePostSaga {
  payload: {
    postId: number,
    navigate: NavigateFunction
  };
}

function* getPostSaga({ payload }: IGetPostSaga) {
  try {
    const { postId } = payload;
    const post: IPost = yield axiosInstance.get(endpoints.posts, { params: { id: postId }}).then(({ data }) => data[0]);
    const comments: IComments[] = yield axiosInstance.get(endpoints.comments, { params: { postId }}).then(({ data }) => data);
    const users: IUser[] = yield axiosInstance.get(endpoints.users, { params: { id: post.userId }}).then(({ data }) =>
      data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
    );
    const user = users[0];
    const controls = getControlsPost(postId);
    yield put(getPostSuccess({post, user, comments, controls}));
  } catch (error) {
    yield put(setPostsErrorMessage('Ошибка загрузки поста'));
    payload.navigate('/forum');
  }
}

function* updatePostInPostPageSaga({ payload }: IUpdatePostSaga) {
  try {
    const { id, comments_number, ...post } = payload;
    const changedPost: IPost = yield axiosInstance.patch(`${endpoints.posts}/${id}`, post).then(({ data }) => data);
    yield put(updatePostInPostPageSuccess(changedPost));
  } catch (error) {
    yield put(updatePostInPostPageFailure());
  }
}

function* deletePostInPostPageSaga({ payload }: IDeletePostSaga) {
  try {
    const { postId, navigate } = payload;
    yield axiosInstance.delete(`${endpoints.posts}/${postId}`);
    yield put(deletePostInPostPageSuccess());
    yield put(setPostsSuccessMessage('Пост успешно удалён'))
    navigate('/forum');
  } catch (error) {
    yield put(deletePostInPostPageFailure());
  }
}

function* forumSaga() {
  yield takeLatest(getPost, getPostSaga);
  yield takeLatest(updatePostInPostPage, updatePostInPostPageSaga);
  yield takeLatest(deletePostInPostPage, deletePostInPostPageSaga);
}

export default forumSaga;