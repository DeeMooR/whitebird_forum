import { IFullUser, IInput, Undefinable } from "src/interfaces";

export const fieldsToCheck = ['name', 'username', 'email', 'phone', 'city', 'zipcode', 'street', 'suite'];

interface IAccountInputs {
  main: IInput[],
  address: IInput[]
}

export interface IAccountForm {
  name: string,
  username: string,
  email: string,
  phone: string,
  city: string,
  zipcode: string,
  street: string,
  suite: string,
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
      id: 'city',
      type: 'text',
      title: 'Город',
      placeholder: 'Город'
    },
    {
      id: 'zipcode',
      type: 'text',
      title: 'Индекс',
      placeholder: 'Индекс'
    },
    {
      id: 'street',
      type: 'text',
      title: 'Улица',
      placeholder: 'Улица'
    },
    {
      id: 'suite',
      type: 'text',
      title: 'Дом',
      placeholder: 'Дом'
    }
  ]
}

// разворачивание объекта, так как useForm плохо работает с вложенными объектами
export const getDefaultUser = (user: Undefinable<IFullUser>) => {
  return  {
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    city: user.address?.city || '',
    zipcode: user.address?.zipcode || '',
    street: user.address?.street || '',
    suite: user.address?.suite || '',
  }
}

// преобразование развёрнутого объекта в формат IFullUser
export const convertUser = (data: IAccountForm, id: number) => {
  const { city, zipcode, street, suite, ...obj } = data;
  return {
    id,
    ...obj,
    address: { city, zipcode, street, suite }
  };
}