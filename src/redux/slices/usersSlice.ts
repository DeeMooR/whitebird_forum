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
  }
})

export const {
  clearUsersMessages,
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  getUserByUserData,
  getUserByUserDataSuccess,
  getUserByUserDataFailure
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;