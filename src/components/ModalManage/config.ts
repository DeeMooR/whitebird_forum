import { IInput, IPost, ITextarea, IUser } from "src/interfaces"
import { changeUserByAdmin, createPost, updatePost, updatePostInPostPage } from "src/redux/slices";

interface IElement {
  element: 'input' | 'textarea',
  data: IInput | ITextarea
}

interface IModalFields {
  user: IElement[],
  post: IElement[],
}

export type objType = 'user' | 'post';
export type idType = 'users_update' | 'posts_update' | 'posts_add' | 'post_update';
export type actionType = 'add' | 'update';

export const modalFields: IModalFields = {
  user: [
    {
      element: 'input',
      data: {
        id: 'username',
        type: 'text',
        title: 'Никнейм',
        placeholder: 'Никнейм'
      },
    },
    {
      element: 'input',
      data: {
        id: 'name',
        type: 'text',
        title: 'Имя',
        placeholder: 'Имя'
      }
    },
    {
      element: 'input',
      data: {
        id: 'email',
        type: 'email',
        title: 'Почта',
        placeholder: 'Почта'
      }
    }
  ],
  post: [
    {
      element: 'input',
      data: {
        id: 'title',
        type: 'text',
        title: 'Заголовок',
        placeholder: 'Заголовок',
      }
    },
    {
      element: 'textarea',
      data: {
        id: 'body',
        title: 'Текст',
        placeholder: 'Текст',
      }
    }
  ],
}

export const modalManageText = {
  user: {
    add: {
      title: 'Добавление пользователя',
      btnText: 'Добавить'
    },
    update: {
      title: 'Редактирование пользователя',
      btnText: 'Изменить'
    },
  },
  post: {
    add: {
      title: 'Добавление поста',
      btnText: 'Добавить'
    },
    update: {
      title: 'Редактирование поста',
      btnText: 'Изменить'
    },
  },
};

export const getModalManageAction = {
  users_update: (data: IUser | IPost) => changeUserByAdmin(data),
  posts_update: (data: IUser | IPost) => updatePost(data),
  posts_add: (data: IUser | IPost) => createPost(data),
  post_update: (data: IUser | IPost) => updatePostInPostPage(data),
};

export const fieldsToCheck = {
  user: ['username', 'name', 'email'],
  post: ['title', 'body']
};