import { IUser } from "src/interfaces";
import { endpoints, axiosInstance } from ".";

export const getUsersApi = (): Promise<IUser[]> => 
  axiosInstance.get(endpoints.users).then(({ data }) =>
    data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
  );

export const getUsersByUsernameApi = (username: string): Promise<IUser[]> => 
  axiosInstance.get(endpoints.users, { params: { username }}).then(({ data }) =>
    data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
  );

export const getUsersByEmailApi = (email: string): Promise<IUser[]> => 
  axiosInstance.get(endpoints.users, { params: { email }}).then(({ data }) =>
    data.map(({ id, name, username, email }: IUser) => ({ id, name, username, email }))
  );

export const updateUserApi = (id: number, user: Partial<IUser>): Promise<IUser> => 
  axiosInstance.patch(`${endpoints.users}/${id}`, user).then(({ data }) => {
    const { id, name, username, email } = data;
    return { id, name, username, email };
  })

export const deleteUserByAdminApi = (id: number): Promise<null> => 
  axiosInstance.delete(`${endpoints.users}/${id}`);