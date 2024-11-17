import { StateType } from "../interfaces";

export const getPostSelector = (state: StateType) => state.post;

export const getPostInPostSelector = (state: StateType) => state.post.post;

export const getUserInPostSelector = (state: StateType) => state.post.user;

export const getControlsInPostSelector = (state: StateType) => state.post.controls;
