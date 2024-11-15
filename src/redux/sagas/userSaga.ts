import { takeLatest, put } from 'redux-saga/effects';
import { signIn, signInSuccess, signInFailure, updateUser, updateUserSuccess, updateUserFailure, deleteUser, deleteUserSuccess, deleteUserFailure } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IFullUser } from 'src/interfaces';

interface ISignInSaga {
  payload: string;
}

interface IUpdateUserSaga {
  payload: IFullUser;
}

interface IDeleteUserSaga {
  payload: number;
}

function* signInSaga({ payload }: ISignInSaga) {
  try {
    const users: IFullUser[] = yield axiosInstance.get(endpoints.users, { params: { email: payload }}).then(({ data }) =>
      data.map(({ id, name, username, email, phone, address }: IFullUser) => ({ id, name, username, email, phone, address }))
    );
    if (users.length === 1) yield put(signInSuccess(users[0]));
    else yield put(signInFailure('Пользователь не существует'));
  } catch (error) {
    yield put(signInFailure('Ошибка входа в аккаунт'));
  }
}

function* updateUserSaga({ payload }: IUpdateUserSaga) {
  try {
    const { id, ...user } = payload;
    const updatedUser: IFullUser = yield axiosInstance.patch(`${endpoints.users}/${id}`, user).then(({ data }) => {
      const { id, name, username, email, phone, address } = data;
      return { id, name, username, email, phone, address };
    })
    yield put(updateUserSuccess(updatedUser));
  } catch (error) {
    yield put(updateUserFailure());
  }
}

function* deleteUserSaga({ payload: id }: IDeleteUserSaga) {
  try {
    yield axiosInstance.delete(`${endpoints.users}/${id}`);
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(deleteUserFailure());
  }
}

function* userSaga() {
  yield takeLatest(signIn, signInSaga);
  yield takeLatest(updateUser, updateUserSaga);
  yield takeLatest(deleteUser, deleteUserSaga);
}

export default userSaga;