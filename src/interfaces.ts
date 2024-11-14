export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface IUser {
  id: number, 
  name: string,
  username: string,
  email: string
}

export interface ISignIn {
  email: string
}

export interface ISearch {
  search: string
}

export interface IPost {
  id: number,
  userId: number,
  title: string,
  body: string,
}