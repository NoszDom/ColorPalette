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
import save from "../../storage/Save";
import { configAxios } from "../../network/Config";

export interface LoginFormParams {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginForm({
  loggedIn,
  setLoggedIn,
  setUser,
  setToken,
}: LoginFormParams) {
  const { handleSubmit, setValue } = useForm<{
    email: string;
    password: string;
  }>();

  const [submitting, setSubmitting] = React.useState<boolean>(false);

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
        setSubmitting(true);
        loginUser(
          values.email,
          values.password,
          {
            loggedIn: loggedIn,
            setLoggedIn: setLoggedIn,
            setUser: setUser,
            setToken: setToken,
          },
          setSubmitting
        );
      }
      //@ts-ignore
      resolve();
    });
  }

  async function loginUser(
    email: string,
    password: string,
    { loggedIn, setLoggedIn, setUser, setToken }: LoginFormParams,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
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
          save({ user: loggedInUser.user, token: loggedInUser.token });

          configAxios({ setLoggedIn: setLoggedIn });
          setLoggedIn(true);

          setSubmitting(false);
        })
        .catch(() => {
          toast({
            status: "error",
            title: "Wrong e-mail address or password!",
            isClosable: true,
          });

          setSubmitting(false);
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
          isLoading={submitting}
        >
          Log in
        </Button>
      </Center>
    </form>
  );
}
