import { takeLatest, put } from 'redux-saga/effects';
import { signIn, signInSuccess, signInFailure } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IUser } from 'src/interfaces';

interface ISignInSaga {
  payload: string;
}

function* signInSaga({ payload }: ISignInSaga) {
  try {
    const users: IUser[] = yield axiosInstance.get(endpoints.users, { params: { email: payload }}).then(({ data }) => data);
    if (users.length === 1) yield put(signInSuccess(users[0]));
    else yield put(signInFailure('Пользователь не существует'));
  } catch (error) {
    yield put(signInFailure('Ошибка входа в аккаунт'));
  }
}

function* userSaga() {
  yield takeLatest(signIn, signInSaga);
}

export default userSaga;