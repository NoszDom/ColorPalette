import jwt_decode from "jwt-decode";
import axios from "axios";

export const targetApiUrl = "https://localhost:5001/api";

export interface configAxiosParams {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function configAxios({ setLoggedIn }: configAxiosParams) {
  const authInterceptor = axios.interceptors.request.use(
    //@ts-ignore
    (req) => {
      const token = localStorage.getItem("token");
      if (token !== null && isValidToken(token)) {
        req.headers["Authorization"] = `Bearer ${token}`;
        return req;
      } else if (req.url?.includes("login")) {
        return req;
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setLoggedIn(false);
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
  const decoded = jwt_decode(token);
  //@ts-ignore
  return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
}
