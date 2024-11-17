import { createSlice } from "@reduxjs/toolkit";
import { IPostState } from "../interfaces";
import { updateArrayIds } from "src/config";
import { updateControlsPost } from "src/controlsPostsData";

const initialState: IPostState = {
  post: null,
  user: null,
  comments: [],
  controls: {
    likeUserIds: [],
    dislikeUserIds: [],
  },
  isLoading: false,
  errorMessage: null,
  successMessage: null,
}

const setLoading = (state: IPostState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}
 
export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    updatePostLikes: (state, { payload }) => {
      const userIds = state.controls.likeUserIds;
      state.controls.likeUserIds = updateArrayIds(userIds, payload);
      state.controls.dislikeUserIds = state.controls.dislikeUserIds.filter(item => item !== payload);
    },
    updatePostDislikes: (state, { payload }) => {
      const userIds = state.controls.dislikeUserIds;
      state.controls.dislikeUserIds = updateArrayIds(userIds, payload);
      state.controls.likeUserIds = state.controls.likeUserIds.filter(item => item !== payload);
    },
    clearPostState: (state) => {
      const obj = {
        postId: state.post?.id!,
        likeUserIds: [...state.controls.likeUserIds],
        dislikeUserIds: [...state.controls.dislikeUserIds]
      }
      updateControlsPost(obj)
      Object.assign(state, initialState);
    },
    clearPostMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },

    getPost: (state, { payload }) => setLoading(state),
    getPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload.post;
      state.user = payload.user;
      state.comments = payload.comments;
      state.controls = payload.controls;
    },
    getPostFailure: (state) => {
      state.isLoading = false;
    },

    updatePostInPostPage: (state, { payload }) => setLoading(state),
    updatePostInPostPageSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    updatePostInPostPageFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка изменения поста';
    },

    deletePostInPostPage: (state, { payload }) => setLoading(state),
    deletePostInPostPageSuccess: (state) => {
      state.isLoading = false;
    },
    deletePostInPostPageFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка удаления поста';
    },
  }
})

export const {
  updatePostLikes,
  updatePostDislikes,
  clearPostState,
  clearPostMessages,
  getPost,
  getPostSuccess,
  getPostFailure,
  updatePostInPostPage,
  updatePostInPostPageSuccess,
  updatePostInPostPageFailure,
  deletePostInPostPage,
  deletePostInPostPageSuccess,
  deletePostInPostPageFailure
} = postSlice.actions;

export const postReducer = postSlice.reducer;