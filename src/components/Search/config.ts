import { getPosts, getPostsByUser, getUsers, getUserByUserData } from "src/redux/slices";

export const getSearchAction = {
  users: (search: string) => search ? getUserByUserData(search) : getUsers(),
  posts: (search: string) => search ? getPostsByUser(search) : getPosts(),
};