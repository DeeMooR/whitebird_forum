import { IUser } from "./interfaces";

export type roleType = 'unauthorized' | 'user' | 'admin';

export const ADMIN_EMAIL = 'Sincere@april.biz';

export const STEP_POSTS = 10;

export const getUsernameById = (users: IUser[], id: number) => {
  const user = users.find(user => user.id === id);
  return user ? user.username : null;
}