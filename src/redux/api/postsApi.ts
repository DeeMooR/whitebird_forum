import { IPost, IUser } from "src/interfaces";
import { endpoints, axiosInstance } from ".";

export const getPostsApi = (): Promise<IPost[]> => 
  axiosInstance.get(endpoints.posts).then(({ data }) => data);

export const getPostsByUserIdApi = (userId: number): Promise<IPost[]> => 
  axiosInstance.get(endpoints.posts, { params: { userId }}).then(({ data }) => data);

export const getUsersApi = (): Promise<IUser[]> => 
  axiosInstance.get(endpoints.users).then(({ data }) =>
    data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
  );

export const getUsersByUsernameApi = (username: string): Promise<IUser[]> => 
  axiosInstance.get(endpoints.users, { params: { username }}).then(({ data }) =>
    data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
  );

export const getUsersByEmailApi = (email: string): Promise<IUser[]> => 
  axiosInstance.get(endpoints.users, { params: { email }}).then(({ data }) =>
    data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
  );

export const updatePostApi = (id: number, post: Partial<IPost>): Promise<IPost> => 
  axiosInstance.patch(`${endpoints.posts}/${id}`, post).then(({ data }) => data);

export const deletePostApi = (id: number): Promise<null> => 
  axiosInstance.delete(`${endpoints.posts}/${id}`);