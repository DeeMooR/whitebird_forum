import { ROLES } from 'src/config';

export const initialState = {
  user: {
    role: ROLES.UNAUTHORIZED,
  },
  post: {
    post: {
      id: 1,
      userId: 1,
      title: 'Post 1',
      body: 'Body 1',
      comments_number: 5,
      priority: 1,
    },
    comments: [
      { id: 1, postId: 1 },
      { id: 2, postId: 1 }
    ],
  },
  local: {
    comments: [
      { id: 2, postId: 1 }
    ],
    isLoading: false,
    successLocalMessage: null,
    errorLocalMessage: null,
  }
};