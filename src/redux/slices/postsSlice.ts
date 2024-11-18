import { createSlice } from "@reduxjs/toolkit";
import { IPostsState } from "../interfaces";

const initialState: IPostsState = {
  posts: [],
  myPosts: [],
  users: [],
  search: null,
  isLoading: false,
  errorMessage: null,
  successMessage: null,
}

const setLoading = (state: IPostsState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}
 
export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPostsSearch: (state, { payload }) => {
      state.search = payload;
    },
    setPostsSuccessMessage: (state, { payload }) => {
      state.successMessage = payload;
    },
    setPostsErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearPostsMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },

    getPosts: (state) => setLoading(state),
    getPostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload.posts;
      state.users = payload.users;
    },
    getPostsFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка загрузки постов';
    },

    getMyPosts: (state, { payload }) => setLoading(state),
    getMyPostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.myPosts = payload.myPosts;
      state.users = payload.users;
    },
    getMyPostsFailure: (state) => {
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

    updatePost: (state, { payload }) => setLoading(state),
    updatePostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = state.posts.map((post) => {
        return (post.id === payload.id) ? payload : post;
      });
      state.myPosts = state.myPosts.map((post) => {
        return (post.id === payload.id) ? payload : post;
      });
      state.successMessage = 'Пост успешно изменён';
    },
    updatePostFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка изменения поста';
    },

    deletePost: (state, { payload }) => setLoading(state),
    deletePostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = state.posts.filter((post) => post.id !== payload);
      state.myPosts = state.myPosts.filter((post) => post.id !== payload);
      state.successMessage = 'Пост успешно удалён';
    },
    deletePostFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка удаления поста';
    },
  }
})

export const {
  setPostsSearch,
  setPostsSuccessMessage,
  setPostsErrorMessage,
  clearPostsMessages,
  getPosts,
  getPostsSuccess,
  getPostsFailure,
  getMyPosts,
  getMyPostsSuccess,
  getMyPostsFailure,
  getPostsByUser,
  getPostsByUserSuccess,
  getPostsByUserFailure,
  updatePost,
  updatePostSuccess,
  updatePostFailure,
  deletePost,
  deletePostSuccess,
  deletePostFailure
} = postsSlice.actions;

export const postsReducer = postsSlice.reducer;