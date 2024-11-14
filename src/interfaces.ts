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