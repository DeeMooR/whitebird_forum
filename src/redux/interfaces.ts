import { roleType } from "src/config";
import { IPost, IFullUser, Undefinable, IUser, IComment } from "src/interfaces";

export type StateType = {
  user: IUserState;
  users: IUsersState;
  posts: IPostsState;
  post: IPostState;
  local: ILocalState;
};

export interface IUserState {
  user: Undefinable<IFullUser>;
  favoritePosts: number[];
  role: roleType | null,
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

export interface IPostsState {
  posts: IPost[];
  myPosts: IPost[];
  users: IUser[];
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export interface IPostState {
  post: IPost | null;
  user: IUser | null;
  comments: IComment[];
  controls: {
    likeUserIds: number[],
    dislikeUserIds: number[],
  }
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export interface ILocalState {
  comments: IComment[];
  posts: IPost[];
  commentsMaxId: number,
  postsMaxId: number,
  isLoading: boolean;
  errorLocalMessage: string | null;
  successLocalMessage: string | null;
}