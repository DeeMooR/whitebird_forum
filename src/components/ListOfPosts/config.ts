import { IPost } from "src/interfaces";

// возвращает id соседних постов, если у них такой же приоритет
export const getMovingPostsId = (posts: IPost[], postId: number) => {
  const index = posts.findIndex(item => item.id === postId);
  const priority = posts[index].priority;
 
  const upPostId = (index > 0 && posts[index - 1].priority === priority) ? posts[index - 1].id : null;
  const downPostId = (index < posts.length - 1 && posts[index + 1].priority === priority) ? posts[index + 1].id : null;
  return {upPostId, downPostId}
}