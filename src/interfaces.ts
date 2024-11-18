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
  },
}

export interface IPost {
  id: number,
  userId: number,
  title: string,
  body: string,
  comments_number: number | null,
  priority: number | null;
}

export interface IComment {
  id: number,
  postId: number,
  email: string,
  name: string,
  body: string,
}

export interface INewComment extends Pick<IComment, 'name' | 'body'>{}

export interface ISignIn {
  email: string
}

export interface ISearchForm {
  search: string
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