import { createSlice } from "@reduxjs/toolkit";
import { IForumState } from "../interfaces";

const initialState: IForumState = {
  posts: [],
  isLoading: false,
  errorMessage: null,
  successMessage: null,
}

const setLoading = (state: IForumState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}
 
export const forumSlice = createSlice({
  name: 'forum',
  initialState: initialState,
  reducers: {
    clearForumMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },

    getPosts: (state) => setLoading(state),
    getPostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload;
    },
    getPostsFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка загрузки постов';
    },

    getPostsByUser: (state, { payload }) => setLoading(state),
    getPostsByUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload;
    },
    getPostsByUserFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка загрузки постов';
    },
  }
})

export const {
  clearForumMessages,
  getPosts,
  getPostsSuccess,
  getPostsFailure,
  getPostsByUser,
  getPostsByUserSuccess,
  getPostsByUserFailure
} = forumSlice.actions;

export const forumReducer = forumSlice.reducer;