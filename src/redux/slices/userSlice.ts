import { createSlice } from "@reduxjs/toolkit";
import { ADMIN_ID } from "src/config";
import { IUserState } from "../interfaces";

const initialState: IUserState = {
  user: {
    id: null, 
    name: null,
    username: null,
    email: null
  },
  role: 'unauthorized',
  isLoading: false,
  errorMessage: null,
  successMessage: null,
}

const setLoading = (state: IUserState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}
 
export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    clearUserMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },

    signIn: (state, { payload }) => setLoading(state),
    signInSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      if (payload.id === ADMIN_ID) {
        state.role = 'admin';
        state.successMessage = 'Вы успешно авторизованы как АДМИН'
      } else {
        state.role = 'user';
      }
    },
    signInFailure: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    logout: (state) => {
      state.user = initialState.user;
      state.role = 'unauthorized';
    },
  }
})

export const {
  clearUserMessages,
  signIn,
  signInSuccess,
  signInFailure
} = userSlice.actions;

export const userReducer = userSlice.reducer;