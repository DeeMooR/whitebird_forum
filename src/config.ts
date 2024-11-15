import { IAccountInput, IFullUser, IUser } from "./interfaces";

export type roleType = 'unauthorized' | 'user' | 'admin';

export const ADMIN_EMAIL = 'Sincere@april.biz';

export const STEP_POSTS = 10;

export const getUsernameById = (users: IUser[], id: number) => {
  const user = users.find(user => user.id === id);
  return user ? user.username : null;
}

interface IAccountInputs {
  main: IAccountInput[],
  address: IAccountInput[]
}

export const accountInputs: IAccountInputs = {
  main: [
    {
      id: 'name',
      type: 'text',
      title: 'Имя',
      placeholder: 'Имя'
    },
    {
      id: 'username',
      type: 'text',
      title: 'Никнейм',
      placeholder: 'Никнейм'
    },
    {
      id: 'email',
      type: 'email',
      title: 'Почта',
      placeholder: 'yourmail@mail.com'
    },
    {
      id: 'phone',
      type: 'tel',
      title: 'Номер телефона',
      placeholder: 'Телефон'
    }
  ],
  address: [
    {
      id: 'address.city',
      type: 'text',
      title: 'Город',
      placeholder: 'Город'
    },
    {
      id: 'address.zipcode',
      type: 'text',
      title: 'Индекс',
      placeholder: 'Индекс'
    },
    {
      id: 'address.street',
      type: 'text',
      title: 'Улица',
      placeholder: 'Улица'
    },
    {
      id: 'address.suite',
      type: 'text',
      title: 'Дом',
      placeholder: 'Дом'
    }
  ]
}