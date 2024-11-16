import { UseFormSetError } from "react-hook-form";
import { IInput, IUser } from "./interfaces";

export type roleType = 'unauthorized' | 'user' | 'admin';

export const ADMIN_EMAIL = 'Sincere@april.biz';

export const STEP_POSTS = 10;

interface IAccountInputs {
  main: IInput[],
  address: IInput[]
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

export const getUserById = (users: IUser[], id: number) => {
  const user = users.find(user => user.id === id);
  return users.find(user => user.id === id);
}

export const getUsernameById = (users: IUser[], id: number) => {
  const user = users.find(user => user.id === id);
  return user ? user.username : null;
}

export const isMobileOrTablet = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Mobi/i.test(userAgent);
  const isTablet = /Tablet/i.test(userAgent);
  return isMobile || isTablet;
}

export const hiddenScroll = () => {
  const scrollType = document.body.style.overflowY;
  document.body.style.overflowY = 'hidden';
  if (!isMobileOrTablet() && scrollType === 'scroll') {
    document.body.style.padding = '0 17px 0 0';
  }
  return scrollType;
}

export const displayScroll = (scrollType: string) => {
  document.body.style.overflowY = scrollType;
  if (!isMobileOrTablet()) {
    document.body.style.padding = '0';
  }
}

export const getFavoritePosts = (userId: number | undefined) => {
  const user = favoritePosts.find(user => user.userId === userId);
  return user ? user.postIds : [];
};

export const checkEmptyValues = (data: Object, fieldsToСheck: string[], setError: UseFormSetError<any>) => {
  const fields = Object.entries(data);
  let isCorrect = true;
 
  fields.filter(([key]) => fieldsToСheck.some(field => key.startsWith(field))).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      console.log(key)
      setError(`${key}`, { message: 'Обязательное поле' });
      isCorrect = false;
    }
  });
  
  return isCorrect;
}