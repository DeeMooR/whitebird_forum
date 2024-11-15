import { takeLatest, put } from 'redux-saga/effects';
import { getUsers, getUsersSuccess, getUsersFailure, getUserByUserData, getUserByUserDataSuccess, getUserByUserDataFailure } from '../slices';
import { axiosInstance, endpoints } from '../api';
import { IUser } from 'src/interfaces';

interface IGetUserByUserDataSaga {
  payload: string;
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

function* usersSaga() {
  yield takeLatest(getUsers, getUsersSaga);
  yield takeLatest(getUserByUserData, getUserByUserDataSaga);
}

export default usersSaga;