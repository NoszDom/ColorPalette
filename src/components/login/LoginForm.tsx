import * as React from "react";
import {
  Center,
  FormControl,
  Input,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/authentication";
import { FormParams } from "../../models/FormParams";
import { useMutation } from "react-query";

export default function LoginForm({
  loggedIn,
  setLoggedIn,
  setUser,
  setToken,
}: FormParams) {
  const { handleSubmit, setValue } = useForm<{
    email: string;
    password: string;
  }>();

  const toast = useToast();

  const loginUserMutation = useMutation(
    (values: any) => {
      return loginUser(values.email, values.password, {
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        setUser: setUser,
        setToken: setToken,
      });
    },
    {
      onSuccess: () => {},
      onError: (error, variables, context) => {
        toast({
          status: "error",
          title: "Wrong e-mail address or password!",
          isClosable: true,
        });
      },
    }
  );

  function onSubmit(values: any) {
    if (
      !values ||
      !values.email ||
      !values.password ||
      !values.email.length ||
      !values.password.length
    ) {
      toast({
        status: "error",
        title: "You must fill in all of the boxes!",
        isClosable: true,
      });
    } else {
      loginUserMutation.mutateAsync(values);
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
          isLoading={loginUserMutation.isLoading}
        >
          Log in
        </Button>
      </Center>
    </form>
  );
}
