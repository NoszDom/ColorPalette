import jwt_decode from "jwt-decode";
import axios from "axios";
import { logoutUser } from "../services/authentication";

export const targetApiUrl = "https://localhost:5001/api";

export interface configAxiosParams {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function configAxios({ setLoggedIn }: configAxiosParams) {
  const authInterceptor = axios.interceptors.request.use(
    (req: any) => {
      if (isWhiteList(req)) return req;

      const token = localStorage.getItem("token");

      if (token !== null && isValidToken(token)) {
        req.headers["Authorization"] = `Bearer ${token}`;
        return req;
      } else {
        logoutUser(setLoggedIn);
        axios.interceptors.request.eject(authInterceptor);
        return Promise.reject();
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

function isValidToken(token: string) {
  const decoded: any = jwt_decode(token);
  return new Date(decoded.exp * 1000) > new Date();
}

function isWhiteList(req: any) {
  return (
    (req.method === "post" && postWhiteList.includes(req.url)) ||
    (req.method === "get" && req.url.includes(getWhiteListExpression))
  );
}

const postWhiteList = [targetApiUrl + "/login", targetApiUrl + "/users"];

const getWhiteListExpression = targetApiUrl + "/colorpalettes?";
