import { takeLatest, put } from 'redux-saga/effects';
import { signIn, signInSuccess, signInFailure } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IUser } from 'src/interfaces';

function* signInSaga({ payload: email }: { payload: string }) {
  try {
    const users: IUser[] = yield axiosInstance.get(endpoints.users, { params: { email }}).then(({ data }) => data);
    if (users.length === 1) yield put(signInSuccess(users[0]));
    else yield put(signInFailure());
  } catch (error) {
    yield put(signInFailure());
  }
}

function* userSaga() {
  yield takeLatest(signIn, signInSaga);
}

export default userSaga;