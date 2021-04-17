import * as React from "react";
import {
  Center,
  FormControl,
  Input,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { User, LoggedInUser } from "../../models/User";
import { useForm } from "react-hook-form";
import { targetApiUrl } from "../../network/Config";
import axios from "axios";

export interface LoginFormParams{
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function LoginForm({loggedIn, setLoggedIn, setUser} : LoginFormParams) {
  const { handleSubmit, formState, setValue } = useForm<{
    email: string;
    password: string;
  }>();

  const toast = useToast();

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      if (values.email.length === 0 || values.password.length === 0) {
        toast({
          status: "error",
          title: "You must fill in all of the boxes!",
          isClosable: true,
        });
      } else {
        loginUser(values.email, values.password, {loggedIn: loggedIn, setLoggedIn: setLoggedIn, setUser: setUser});
      }
      //@ts-ignore
      resolve();
    });
  }

  async function loginUser(email: string, password: string, {loggedIn, setLoggedIn, setUser} : LoginFormParams) {
    if(!loggedIn){
      axios
      .post(targetApiUrl + "/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const loggedInUser: LoggedInUser = response.data;
        setUser(loggedInUser.user);
        setLoggedIn(true);
      })
      .catch(() => {
        toast({
          status: "error",
          title: "Wrong e-mail address or password!",
          isClosable: true,
        });
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          name="email"
          type="email"
          onChange={(e) => setValue("email", e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="password">Password:</FormLabel>
        <Input
          name="password"
          type="password"
          onChange={(e) => setValue("password", e.target.value)}
        />
      </FormControl>
      <Center>
        <Button
          mt={4}
          colorScheme="purple"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Log in
        </Button>
      </Center>
    </form>
  );
}
