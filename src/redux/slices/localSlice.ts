import { createSlice } from "@reduxjs/toolkit";
import { ILocalState } from "../interfaces";

const initialState: ILocalState = {
  comments: [],
  posts: [],
  commentsMaxId: 500,
  postsMaxId: 100,
  isLoading: false,
  errorLocalMessage: null,
  successLocalMessage: null,
}

const setLoading = (state: ILocalState) => {
  state.isLoading = true;
  state.successLocalMessage = null;
  state.errorLocalMessage = null;
}

export const localSlice = createSlice({
  name: 'local',
  initialState: initialState,
  reducers: {
    updateLocalPostPriority: (state, { payload }) => {
      const { postId, priority } = payload;
      state.posts = state.posts.map(post => {
        return (post.id === postId) ? {...post, priority} : post;
      });
    },
    clearLocalMessages: (state) => {
      state.successLocalMessage = null;
      state.errorLocalMessage = null;
    },
    clearLocalState: (state) => {
      Object.assign(state, initialState);
    },

    createComment: (state, { payload }) => setLoading(state),
    createCommentSuccess: (state, { payload }) => {
      const { newComment, updatedPosts } = payload;
      state.isLoading = false;
      state.comments = [newComment, ...state.comments];
      state.commentsMaxId = state.commentsMaxId + 1;
      state.posts = updatedPosts;
    },
    createCommentFailure: (state) => {
      state.isLoading = false;
      state.errorLocalMessage = 'Ошибка добавления комментария';
    },

    updateComment: (state, { payload }) => setLoading(state),
    updateCommentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.comments = state.comments.map(item => {
        return (item.id === payload.id) ? payload : item; 
      });
      state.successLocalMessage = 'Комментарий успешно изменён';
    },
    updateCommentFailure: (state) => {
      state.isLoading = false;
      state.errorLocalMessage = 'Ошибка изменения комментария';
    },

    deleteComment: (state, { payload }) => setLoading(state),
    deleteCommentSuccess: (state, { payload }) => {
      const { id, updatedPosts } = payload;
      state.isLoading = false;
      state.comments = state.comments.filter(item => item.id !== id);
      state.posts = updatedPosts;
      state.successLocalMessage = 'Комментарий успешно удалён';
    },
    deleteCommentFailure: (state) => {
      state.isLoading = false;
      state.errorLocalMessage = 'Ошибка удаления комментария';
    },

    createLocalPost: (state, { payload }) => setLoading(state),
    createLocalPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = [payload, ...state.posts];
      state.postsMaxId = state.postsMaxId + 1;
      state.successLocalMessage = 'Пост успешно создан';
    },
    createLocalPostFailure: (state) => {
      state.isLoading = false;
      state.errorLocalMessage = 'Ошибка добавления поста';
    },

    updateLocalPost: (state, { payload }) => setLoading(state),
    updateLocalPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = state.posts.map(item => {
        return (item.id === payload.id) ? payload : item; 
      });
      state.successLocalMessage = 'Пост успешно изменён';
    },
    updateLocalPostFailure: (state) => {
      state.isLoading = false;
      state.errorLocalMessage = 'Ошибка изменения поста';
    },

    deleteLocalPost: (state, { payload }) => setLoading(state),
    deleteLocalPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = state.posts.filter(item => item.id !== payload);
      state.successLocalMessage = 'Пост успешно удалён';
    },
    deleteLocalPostFailure: (state) => {
      state.isLoading = false;
      state.errorLocalMessage = 'Ошибка удаления поста';
    },
  }
})

export const {
  updateLocalPostPriority,
  clearLocalMessages,
  clearLocalState,
  createComment,
  createCommentSuccess,
  createCommentFailure,
  updateComment,
  updateCommentSuccess,
  updateCommentFailure,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure,
  createLocalPost,
  createLocalPostSuccess,
  createLocalPostFailure,
  updateLocalPost,
  updateLocalPostSuccess,
  updateLocalPostFailure,
  deleteLocalPost,
  deleteLocalPostSuccess,
  deleteLocalPostFailure
} = localSlice.actions;

export const localReducer = localSlice.reducer;