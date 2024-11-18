import { IUser } from "src/interfaces";

export const getUsernameById = (users: IUser[], id: number) => {
  const user = users.find(user => user.id === id);
  return user ? user.username : null;
}

export const getTextPluralComments = (count: number) => {
  const rules = ['ответ', 'ответа', 'ответов'];
  const result = new Intl.PluralRules('ru-RU').select(count);
  switch (result) {
    case 'one': return rules[0];
    case 'few': return rules[1];
    default: return rules[2];
  }
}