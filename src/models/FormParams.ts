import { User } from "./User";

export interface FormParams {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
