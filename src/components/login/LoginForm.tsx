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
import { useEffect } from "react";
import { FormParams } from "../../models/FormParams";

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

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    if (error === true) {
      toast({
        status: "error",
        title: "Wrong e-mail address or password!",
        isClosable: true,
      });
      setError(false);
    }
  }, [error, toast]);

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
          setSubmitting,
          setError
        );
      }
      resolve(null);
    });
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
