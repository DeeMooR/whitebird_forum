import { createSlice } from "@reduxjs/toolkit";
import { ADMIN_EMAIL, getFavoritePosts } from "src/config";
import { IUserState } from "../interfaces";

const initialState: IUserState = {
  user: {
    id: undefined, 
    name: undefined,
    username: undefined,
    email: undefined,
    address: undefined,
    phone: undefined,
  },
  favoritePosts: [],
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
    setUserFavoritePosts: (state) => {
      state.favoritePosts = getFavoritePosts(state.user.id);
    },
    updateUserFavoritePosts: (state, { payload: postId }) => {
      const postIds = state.favoritePosts;
      state.favoritePosts = postIds.includes(postId) 
        ? postIds.filter(id => id !== postId)
        : [...postIds, postId];
    },
    clearUserFavoritePosts: (state) => {
      state.favoritePosts = [];
    },
    logout: (state) => {
      state.user = initialState.user;
      state.role = 'unauthorized';
      localStorage.removeItem('userEmail');
    },

    signIn: (state, { payload }) => setLoading(state),
    signInSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      if (payload.email === ADMIN_EMAIL) {
        state.role = 'admin';
        state.successMessage = 'Вы успешно авторизованы как АДМИН'
      } else {
        state.role = 'user';
      }
      localStorage.setItem('userEmail', payload.email);
    },
    signInFailure: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    updateUser: (state, { payload }) => setLoading(state),
    updateUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.successMessage = 'Данные успешно изменены';
    },
    updateUserFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка изменения данных';
    },

    deleteUser: (state, { payload }) => setLoading(state),
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.user = initialState.user;
      state.role = 'unauthorized';
      state.successMessage = 'Пользователь успешно удалён';
      localStorage.removeItem('userEmail');
    },
    deleteUserFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка удаления пользователя';
    },
  }
})

export const {
  clearUserMessages,
  setUserFavoritePosts,
  updateUserFavoritePosts,
  clearUserFavoritePosts,
  logout,
  signIn,
  signInSuccess,
  signInFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure
} = userSlice.actions;

export const userReducer = userSlice.reducer;