import { UseFormRegister } from "react-hook-form";

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type Undefinable<T> = {
  [P in keyof T]: T[P] | undefined;
};

export interface IUser {
  id: number, 
  name: string,
  username: string,
  email: string
}

export interface IFullUser extends IUser {
  phone: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    }
  },
}

export interface ISignIn {
  email: string
}

export interface ISearchForm {
  search: string
}

export interface IPost {
  id: number,
  userId: number,
  title: string,
  body: string,
  comments_number: number | null,
}

export interface IComment {
  id: number,
  postId: number,
  email: string,
  name: string,
  body: string,
}

export interface IInputBlock {
  id: string;
  register: UseFormRegister<any>;
  type: 'text' | 'password' | 'email' | 'tel';
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  classNameInput?: string;
}

export interface IInput {
  id: string;
  type: 'text' | 'password' | 'email' | 'tel';
  title?: string;
  placeholder?: string;
}

export interface ITextarea {
  id: string;
  title?: string;
  placeholder?: string;
  max?: number;
}