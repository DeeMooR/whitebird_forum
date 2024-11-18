import { StateType } from "../interfaces";

export const getLocalSelector = (state: StateType) => state.local;

export const getLocalCommentsSelector = (state: StateType) => state.local.comments;

export const getLocalPostsSelector = (state: StateType) => state.local.posts;

export const getLocalIsLoadingSelector = (state: StateType) => state.local.isLoading;