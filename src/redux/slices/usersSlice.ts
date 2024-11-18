import { createSlice } from "@reduxjs/toolkit";
import { IUsersState } from "../interfaces";

const initialState: IUsersState = {
  users: [],
  isLoading: false,
  errorMessage: null,
  successMessage: null,
}

const setLoading = (state: IUsersState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}
 
export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    clearUsersMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },

    getUsers: (state) => setLoading(state),
    getUsersSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    getUsersFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка загрузки пользователей';
    },

    getUserByUserData: (state, { payload }) => setLoading(state),
    getUserByUserDataSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    getUserByUserDataFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка загрузки пользователей';
    },

    deleteUserByAdmin: (state, { payload }) => setLoading(state),
    deleteUserByAdminSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== payload);
      state.successMessage = 'Пользователь успешно удалён';
    },
    deleteUserByAdminFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка удаления пользователя';
    },
    
    changeUserByAdmin: (state, { payload }) => setLoading(state),
    changeUserByAdminSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.users = state.users.map((user) => {
        return (user.id === payload.id) ? payload : user;
      });
      state.successMessage = 'Данные пользователя успешно изменены';
    },
    changeUserByAdminFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка изменения данных пользователя';
    },
  }
})

export const {
  clearUsersMessages,
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  getUserByUserData,
  getUserByUserDataSuccess,
  getUserByUserDataFailure,
  deleteUserByAdmin,
  deleteUserByAdminSuccess,
  deleteUserByAdminFailure,
  changeUserByAdmin,
  changeUserByAdminSuccess,
  changeUserByAdminFailure
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;