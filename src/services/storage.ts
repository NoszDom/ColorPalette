import { User } from "../models/User";
import jwt_decode from "jwt-decode";
import { configAxios } from "../network/config";

export function save(user: User, token: string) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

export function load(
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  setToken: React.Dispatch<React.SetStateAction<string>>
) {
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

function isValidToken(token: string): boolean {
  const decoded = jwt_decode(token);
  //@ts-ignore
  return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
}
