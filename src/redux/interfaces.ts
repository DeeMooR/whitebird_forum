import { roleType } from "src/config";
import { IUser, Nullable } from "src/interfaces";

export type StateType = {
  user: IUserState;
};

export interface IUserState {
  user: Nullable<IUser>;
  role: roleType,
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}