import { createSlice } from "@reduxjs/toolkit";
import { ILocalState } from "../interfaces";

const initialState: ILocalState = {
  comments: [],
  maxId: 500,
  isLoading: false,
  errorMessage: null,
  successMessage: null,
}

const setLoading = (state: ILocalState) => {
  state.isLoading = true;
  state.successMessage = null;
  state.errorMessage = null;
}

export const localSlice = createSlice({
  name: 'local',
  initialState: initialState,
  reducers: {
    clearLocalMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },

    createComment: (state, { payload }) => setLoading(state),
    createCommentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.comments = [payload, ...state.comments];
      state.maxId = state.maxId + 1;
    },
    createCommentFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка добавление комментария';
    },

    updateComment: (state, { payload }) => setLoading(state),
    updateCommentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.comments = state.comments.map(item => {
        return (item.id === payload.id) ? payload : item; 
      });
      state.successMessage = 'Комментарий успешно изменён';
    },
    updateCommentFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка изменения комментария';
    },

    deleteComment: (state, { payload }) => setLoading(state),
    deleteCommentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.comments = state.comments.filter(item => item.id !== payload);
      state.successMessage = 'Комментарий успешно удалён';
    },
    deleteCommentFailure: (state) => {
      state.isLoading = false;
      state.errorMessage = 'Ошибка удаления комментария';
    },
  }
})

export const {
  clearLocalMessages,
  createComment,
  createCommentSuccess,
  createCommentFailure,
  updateComment,
  updateCommentSuccess,
  updateCommentFailure,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure
} = localSlice.actions;

export const localReducer = localSlice.reducer;