import { IFullUser, Undefinable } from "src/interfaces";

export const fieldsToCheck = ['name', 'username', 'email', 'phone', 'city', 'zipcode', 'street', 'suite'];

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

export const convertUser = (data: IAccountForm, id: number) => {
  const { city, zipcode, street, suite, ...obj } = data;
  return {
    id,
    ...obj,
    address: { city, zipcode, street, suite }
  };
}