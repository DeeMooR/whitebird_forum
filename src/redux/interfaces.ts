import { roleType } from "src/config";
import { IPost, IFullUser, Undefinable, IUser } from "src/interfaces";

export type StateType = {
  user: IUserState;
  posts: IPostsState;
  users: IUsersState;
};

export interface IUserState {
  user: Undefinable<IFullUser>;
  favoritePosts: number[];
  role: roleType | null,
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export interface IPostsState {
  posts: IPost[];
  myPosts: IPost[];
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