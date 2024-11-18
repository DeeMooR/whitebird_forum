import { UseFormSetError } from "react-hook-form";
import { IComment, IPost, IUser } from "./interfaces";

export enum ROLES {
  UNAUTHORIZED = 'unauthorized',
  USER = 'user',
  ADMIN = 'admin',
}

export const ADMIN_EMAIL = 'Sincere@april.biz';

export const STEP_POSTS = 10;

export const favoritePosts = [
  {
    userId: 1,
    postIds: [2,3,11,12,15,38,39,40,46,47,61,65,70,90,97] 
  },
  {
    userId: 2,
    postIds: [6, 8, 12, 22, 23, 25, 33, 36, 51, 55, 59, 62, 75, 83, 89]
  },
  {
    userId: 3,
    postIds: [4, 10, 15, 17, 20, 29, 34, 38, 44, 54, 58, 73, 76, 81, 82]
  },
  {
    userId: 4,
    postIds: [7, 11, 13, 16, 21, 24, 31, 32, 33, 39, 41, 51, 66, 70, 85]
  },
  {
    userId: 5,
    postIds: [1, 3, 5, 7, 10, 12, 14, 16, 17, 26, 61, 73, 79, 88, 90]
  },
  {
    userId: 6,
    postIds: [3, 10, 12, 20, 24, 34, 39, 42, 50, 56, 62, 77, 83, 86, 89]
  },
  {
    userId: 7,
    postIds: [4, 10, 16, 26, 34, 37, 38, 50, 59, 61, 77, 86, 90, 92, 100]
  },
  {
    userId: 8,
    postIds: [1, 13, 14, 16, 26, 30, 36, 39, 44, 56, 63, 65, 71, 82, 94]
  },
  {
    userId: 9,
    postIds: [15, 18, 23, 29, 34, 37, 42, 51, 52, 54, 56, 65, 72, 82, 97]
  },
  {
    userId: 10,
    postIds: [5, 6, 10, 13, 18, 23, 28, 38, 56, 60, 64, 72, 78, 85, 99]
  }
]

export const getFavoritePosts = (userId: number | undefined) => {
  const user = favoritePosts.find(user => user.userId === userId);
  return user ? user.postIds : [];
};

export const checkEmptyValues = (data: Object, fieldsToСheck: string[], setError: UseFormSetError<any>) => {
  const fields = Object.entries(data);
  let isCorrect = true;

  fields.filter(([key]) => fieldsToСheck.some(field => key.startsWith(field))).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      setError(`${key}`, { message: 'Обязательное поле' });
      isCorrect = false;
    }
  });
  return isCorrect;
}

export const updateArrayIds = (array: number[], id: number) => {
  return array.includes(id) 
    ? array.filter(item => item !== id)
    : [...array, id];
}

export const addCommentsNumberToPosts = async (posts: IPost[], localComments: IComment[]): Promise<IPost[]> => {
  return Promise.all(
    posts.map(async (post) => {
      // const comments = await axiosInstance
      //   .get(endpoints.comments, { params: { postId: post.id }})
      //   .then(({ data }) => data);
      const dbCommentsNumber = 5;
      const localCommentsNumber = localComments.reduce((acc, item) => {
        return (item.postId === post.id) ? acc + 1 : acc;
      }, 0)
      const commentsNumber = dbCommentsNumber + localCommentsNumber;
      return { ...post, comments_number: commentsNumber };
    })
  );
}