import { targetApiUrl } from "../network/config";
import axios from "axios";
import { save } from "./storage";
import { configAxios } from "../network/config";
import { LoggedInUser } from "../models/User";
import { FormParams } from "../models/FormParams";

export async function loginUser(
  email: string,
  password: string,
  { loggedIn, setLoggedIn, setUser, setToken }: FormParams
) {
  if (!loggedIn) {
    axios
      .post(targetApiUrl + "/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const loggedInUser: LoggedInUser = response.data;
        setUser(loggedInUser.user);
        setToken(loggedInUser.token);
        save(loggedInUser.user, loggedInUser.token);

        configAxios({ setLoggedIn: setLoggedIn });
        setLoggedIn(true);
      });
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  { loggedIn, setLoggedIn, setUser, setToken }: FormParams
) {
  axios
    .post(targetApiUrl + "/users/", {
      name: name,
      email: email,
      password: password,
    })
    .then(() => {
      loginUser(email, password, { loggedIn, setLoggedIn, setUser, setToken });
    });
  return false;
}

export function logoutUser(
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setLoggedIn(false);
}
