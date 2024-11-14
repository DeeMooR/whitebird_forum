import { roleType } from "src/config";
import { IPostForum, IUser, Nullable } from "src/interfaces";

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
  posts: IPostForum[];
  users: IUser[];
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}