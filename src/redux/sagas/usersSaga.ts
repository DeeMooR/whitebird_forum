import { takeLatest, put } from 'redux-saga/effects';
import { getUsers, getUsersSuccess, getUsersFailure, getUserByUserData, getUserByUserDataSuccess, getUserByUserDataFailure, deleteUserByAdminSuccess, deleteUserByAdminFailure, deleteUserByAdmin, changeUserByAdmin, changeUserByAdminSuccess, changeUserByAdminFailure } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IUser } from 'src/interfaces';

interface IGetUserByUserDataSaga {
  payload: string;
}

interface IDeleteUserByAdminSaga {
  payload: number;
}

interface IChangeUserByAdminSaga {
  payload: IUser;
}



function* getUsersSaga() {
  try {
    const users: IUser[] = yield axiosInstance.get(endpoints.users).then(({ data }) =>
      data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
    );
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield put(getUsersFailure());
  }
}

function* getUserByUserDataSaga({ payload }: IGetUserByUserDataSaga) {
  try {
    let users: IUser[] = yield axiosInstance.get(endpoints.users, { params: { username: payload }}).then(({ data }) =>
      data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
    );
    if (!users.length) {
      users = yield axiosInstance.get(endpoints.users, { params: { email: payload }}).then(({ data }) =>
        data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
      );
    }
    yield put(getUserByUserDataSuccess(users));
  } catch (error) {
    yield put(getUserByUserDataFailure());
  }
}

function* deleteUserByAdminSaga({ payload: id }: IDeleteUserByAdminSaga) {
  try {
    yield axiosInstance.delete(`${endpoints.users}/${id}`);
    yield put(deleteUserByAdminSuccess(id));
  } catch (error) {
    yield put(deleteUserByAdminFailure());
  }
}

function* changeUserByAdminSaga({ payload }: IChangeUserByAdminSaga) {
  try {
    const { id, ...user } = payload;
    const changedUser: IUser = yield axiosInstance.patch(`${endpoints.users}/${id}`, user).then(({ data }) => {
      const { id, name, username, email } = data;
      return { id, name, username, email };
    })
    yield put(changeUserByAdminSuccess(changedUser));
  } catch (error) {
    yield put(changeUserByAdminFailure());
  }
}

function* usersSaga() {
  yield takeLatest(getUsers, getUsersSaga);
  yield takeLatest(getUserByUserData, getUserByUserDataSaga);
  yield takeLatest(deleteUserByAdmin, deleteUserByAdminSaga);
  yield takeLatest(changeUserByAdmin, changeUserByAdminSaga);
}

export default usersSaga;