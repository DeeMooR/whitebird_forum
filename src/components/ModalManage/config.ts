import { IInput, IPost, ITextarea, IUser } from "src/interfaces"
import { changeUserByAdmin, updatePost } from "src/redux/slices";

interface IElement {
  element: 'input' | 'textarea',
  data: IInput | ITextarea
}

interface IModalFields {
  user: IElement[],
  post: IElement[],
}

export type objType = 'user' | 'post';

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

export const getModalManageAction = {
  user: (data: IUser | IPost) => changeUserByAdmin(data),
  post: (data: IUser | IPost) => updatePost(data)
};

export const fieldsToCheck = {
  user: ['username', 'name', 'email'],
  post: ['title', 'body']
};