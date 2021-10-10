import { targetApiUrl } from "../network/Config";
import axios from "axios";
import { save } from "./storage";
import { configAxios } from "../network/Config";
import { LoggedInUser } from "../models/User";
import { FormParams } from "../models/FormParams";

export async function loginUser(
  email: string,
  password: string,
  { loggedIn, setLoggedIn, setUser, setToken }: FormParams,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
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

        setSubmitting(false);
      })
      .catch(() => {
        setError(true);
        setSubmitting(false);
      });
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  { loggedIn, setLoggedIn, setUser, setToken }: FormParams,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) {
  axios
    .post(targetApiUrl + "/users/", {
      name: name,
      email: email,
      password: password,
    })
    .then(() => {
      loginUser(
        email,
        password,
        { loggedIn, setLoggedIn, setUser, setToken },
        setSubmitting,
        setError
      );
    })
    .catch(() => {
      setError(true);
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