import { IFullUser } from "src/interfaces";
import { endpoints, axiosInstance } from ".";

export const getFullUsersByEmailApi = (email: string): Promise<IFullUser[]> => 
  axiosInstance.get(endpoints.users, { params: { email }}).then(({ data }) =>
    data.map(({ id, name, username, email, phone, address }: IFullUser) => ({ id, name, username, email, phone, address }))
  );

export const updateUserApi = (id: number, user: Partial<IFullUser>): Promise<IFullUser> => 
  axiosInstance.patch(`${endpoints.users}/${id}`, user).then(({ data }) => {
    const { id, name, username, email, phone, address } = data;
    return { id, name, username, email, phone, address };
  });

export const deleteUserApi = (id: number): Promise<null> => 
  axiosInstance.delete(`${endpoints.users}/${id}`);