import { User } from "../models/User";

export interface saveParams{
    user: User;
    token: string;
}

export default function save({user, token} : saveParams){
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
}