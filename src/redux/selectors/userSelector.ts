import { StateType } from "../interfaces";

export const getUserSelector = (state: StateType) => state.user;

export const getUserDataSelector = (state: StateType) => state.user.user;
