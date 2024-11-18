import { IComment, IPost } from "src/interfaces";
import { endpoints, axiosInstance } from ".";

export const createCommentApi = (comment: Partial<IComment>): Promise<IComment> => 
  axiosInstance.post(endpoints.comments, comment).then(({ data }) => data);

export const updateCommentApi = (id: number, comment: Partial<IComment>): Promise<IComment> => 
  axiosInstance.patch(`${endpoints.comments}/${id}`, comment).then(({ data }) => data);

export const deleteCommentApi = (id: number): Promise<null> => 
  axiosInstance.delete(`${endpoints.comments}/${id}`);


export const createLocalPostApi = (post: Partial<IPost>): Promise<IPost> => 
  axiosInstance.post(endpoints.posts, post).then(({ data }) => data);

export const updateLocalPostApi = (id: number, post: Partial<IPost>): Promise<IPost> => 
  axiosInstance.patch(`${endpoints.posts}/${id}`, post).then(({ data }) => data);

export const deleteLocalPostApi = (id: number): Promise<null> => 
  axiosInstance.delete(`${endpoints.posts}/${id}`);