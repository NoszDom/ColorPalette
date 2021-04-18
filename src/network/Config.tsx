import jwt_decode from "jwt-decode";
import axios from "axios";

export const targetApiUrl = "https://localhost:5001/api";

export interface configAxiosParams {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
}

export function configAxios({ token, setLoggedIn }: configAxiosParams) {
  axios.interceptors.request.use(
    //@ts-ignore
    (req) => {
      if (isValidToken(token)) {
        req.headers["Authorization"] = token;
        console.log(JSON.stringify(req));
        return req;
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setLoggedIn(false);
        return Promise.reject("Session timed out.");
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
