import { roleType } from "src/config";
import { IPost, IFullUser, Undefinable, IUser } from "src/interfaces";

export type StateType = {
  user: IUserState;
  forum: IForumState;
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

export interface IForumState {
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