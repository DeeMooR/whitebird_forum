import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put } from 'redux-saga/effects';
import { signIn, signInSuccess, signInFailure, updateUser, updateUserSuccess, updateUserFailure, deleteUser, deleteUserSuccess, deleteUserFailure } from '../slices';
import { deleteUserApi, getFullUsersByEmailApi, updateUserApi } from '../api/userApi';
import { IFullUser } from 'src/interfaces';

function* signInSaga({ payload }: PayloadAction<string>) {
  try {
    const users: IFullUser[] = yield getFullUsersByEmailApi(payload);
    if (users.length === 1) yield put(signInSuccess(users[0]));
    else yield put(signInFailure('Пользователь не существует'));
  } catch (error) {
    yield put(signInFailure('Ошибка входа в аккаунт'));
  }
}

function* updateUserSaga({ payload }: PayloadAction<IFullUser>) {
  try {
    const { id, ...user } = payload;
    const updatedUser: IFullUser = yield updateUserApi(id, user);
    yield put(updateUserSuccess(updatedUser));
  } catch (error) {
    yield put(updateUserFailure());
  }
}

function* deleteUserSaga({ payload: id }: PayloadAction<number>) {
  try {
    yield deleteUserApi(id);
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(deleteUserFailure());
  }
}

export function* userSaga() {
  yield takeLatest(signIn, signInSaga);
  yield takeLatest(updateUser, updateUserSaga);
  yield takeLatest(deleteUser, deleteUserSaga);
}