export type User = {
    id: number;
    name: string;
    email: string;
}

export type LoggedInUser ={
  user: User;
  token: string;
}