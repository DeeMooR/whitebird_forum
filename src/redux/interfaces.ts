import { roleType } from "src/config";
import { IPostForum, IFullUser, Undefinable, IUser } from "src/interfaces";

export type StateType = {
  user: IUserState;
  forum: IForumState;
  users: IUsersState;
};

export interface IUserState {
  user: Undefinable<IFullUser>;
  favoritePosts: number[];
  role: roleType,
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export interface IForumState {
  posts: IPostForum[];
  users: IUser[];
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export interface IUsersState {
  users: IUser[];
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}