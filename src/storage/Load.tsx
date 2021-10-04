import { User } from "../models/User";
import jwt_decode from "jwt-decode";
import { configAxios } from "../network/Config";

export interface loadParams {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function load({ setLoggedIn, setUser, setToken }: loadParams) {
  const token: string | null = localStorage.getItem("token");
  if (token === null || token === "") return;
  else if (!isValidToken(token)) return;
  else {
    const userString = localStorage.getItem("user");
    if (userString === null || userString === "") return;
    const user: User = JSON.parse(userString);

    configAxios({ setLoggedIn: setLoggedIn });

    setToken(token);
    setUser(user);
    setLoggedIn(true);
  }
}

function isValidToken(token: string) {
  const decoded = jwt_decode(token);
  //@ts-ignore
  return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
}
