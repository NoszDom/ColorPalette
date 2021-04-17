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
import { targetApiUrl } from "../../network/Config";
import axios from "axios";

export default function LoginForms() {
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
        loginUser(values.email, values.password);
      }
      //@ts-ignore
      resolve();
    });
  }

  async function loginUser(email: string, password: string) {
    axios
      .post(targetApiUrl + "/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        toast({
          status: "success",
          title: JSON.stringify(response.data),
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          status: "error",
          title: "Wrong e-mail address or password!",
          isClosable: true,
        });
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
          isLoading={formState.isSubmitting}
        >
          Log in
        </Button>
      </Center>
    </form>
  );
}
