import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put } from 'redux-saga/effects';
import { getUsers, getUsersSuccess, getUsersFailure, getUserByUserData, getUserByUserDataSuccess, getUserByUserDataFailure, deleteUserByAdminSuccess, deleteUserByAdminFailure, deleteUserByAdmin, changeUserByAdmin, changeUserByAdminSuccess, changeUserByAdminFailure } from '../slices';
import { deleteUserByAdminApi, getUsersApi, getUsersByEmailApi, getUsersByUsernameApi, updateUserApi } from '../api/usersApi';
import { IUser } from 'src/interfaces';

function* getUsersSaga() {
  try {
    const users: IUser[] = yield getUsersApi();
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield put(getUsersFailure());
  }
}

function* getUserByUserDataSaga({ payload }: PayloadAction<string>) {
  try {
    let users: IUser[] = yield getUsersByUsernameApi(payload);
    if (!users.length) {
      users = yield getUsersByEmailApi(payload);
    }
    yield put(getUserByUserDataSuccess(users));
  } catch (error) {
    yield put(getUserByUserDataFailure());
  }
}

function* changeUserByAdminSaga({ payload }: PayloadAction<IUser>) {
  try {
    const { id, ...user } = payload;
    const changedUser: IUser = yield updateUserApi(id, user);
    yield put(changeUserByAdminSuccess(changedUser));
  } catch (error) {
    yield put(changeUserByAdminFailure());
  }
}

function* deleteUserByAdminSaga({ payload: id }: PayloadAction<number>) {
  try {
    yield deleteUserByAdminApi(id);
    yield put(deleteUserByAdminSuccess(id));
  } catch (error) {
    yield put(deleteUserByAdminFailure());
  }
}

export function* usersSaga() {
  yield takeLatest(getUsers, getUsersSaga);
  yield takeLatest(getUserByUserData, getUserByUserDataSaga);
  yield takeLatest(changeUserByAdmin, changeUserByAdminSaga);
  yield takeLatest(deleteUserByAdmin, deleteUserByAdminSaga);
}