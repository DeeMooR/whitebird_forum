import { IComment, IInput, IPost, ITextarea, IUser } from "src/interfaces"
import { changeUserByAdmin, createPost, updateComment, updatePost, updatePostInPostPage } from "src/redux/slices";

interface IElement {
  element: 'input' | 'textarea',
  data: IInput | ITextarea
}

interface IModalFields {
  user: IElement[],
  post: IElement[],
  comment: IElement[]
}

export type objType = IUser | IPost | IComment;
export type objStructure = 'user' | 'post' | 'comment';
export type idType = 'users_update' | 'posts_update' | 'posts_add' | 'post_update' | 'comment_update';
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
  comment: [
    {
      element: 'input',
      data: {
        id: 'name',
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
      title: 'Создание поста',
      btnText: 'Добавить'
    },
    update: {
      title: 'Редактирование поста',
      btnText: 'Изменить'
    },
  },
  comment: {
    add: {
      title: 'Создание комментария',
      btnText: 'Добавить'
    },
    update: {
      title: 'Редактирование комментария',
      btnText: 'Изменить'
    },
  },
};

export const getModalManageAction = {
  users_update: (data: objType) => changeUserByAdmin(data),
  posts_update: (data: objType) => updatePost(data),
  posts_add: (data: objType) => createPost(data),
  post_update: (data: objType) => updatePostInPostPage(data),
  comment_update: (data: objType) => updateComment(data),
};

export const fieldsToCheck = {
  user: ['username', 'name', 'email'],
  post: ['title', 'body'],
  comment: ['name', 'body']
};