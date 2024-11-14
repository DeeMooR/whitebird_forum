import { roleType } from "src/config";
import { IPost, IUser, Nullable } from "src/interfaces";

export type StateType = {
  user: IUserState;
  forum: IForumState;
};

export interface IUserState {
  user: Nullable<IUser>;
  role: roleType,
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export interface IForumState {
  posts: IPost[];
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}