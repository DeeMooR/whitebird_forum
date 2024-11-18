import { IComment, IPost, IUser } from "src/interfaces";
import { endpoints, axiosInstance } from ".";

export const getPostApi = (postId: number): Promise<IPost> => 
  axiosInstance.get(endpoints.posts, { params: { postId }}).then(({ data }) => data[0]);

export const getCommentsApi = (postId: number): Promise<IComment[]> => 
  axiosInstance.get(endpoints.comments, { params: { postId }}).then(({ data }) => data);

export const getUsersApi = (id: number): Promise<IUser[]> => 
  axiosInstance.get(endpoints.users, { params: { id }}).then(({ data }) =>
    data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
  );

export const updatePostApi = (id: number, post: Partial<IPost>): Promise<IPost> => 
  axiosInstance.patch(`${endpoints.posts}/${id}`, post).then(({ data }) => data);

export const deletePostApi = (id: number): Promise<null> => 
  axiosInstance.delete(`${endpoints.posts}/${id}`);