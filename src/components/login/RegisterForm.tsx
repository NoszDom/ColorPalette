import * as React from "react";
import {
  FormControl,
  Input,
  FormLabel,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { createUser } from "../../services/authentication";
import { useEffect, useState } from "react";
import { FormParams } from "../../models/FormParams";

export default function RegisterForm({
  loggedIn,
  setLoggedIn,
  setUser,
  setToken,
}: FormParams) {
  const { handleSubmit, setValue } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordAgain: string;
  }>();

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    if (error === true) {
      toast({
        status: "error",
        title: "User already exists!",
        isClosable: true,
      });
      setError(false);
    }
  }, [error, toast]);

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      if (values.password !== values.passwordAgain) {
        toast({
          status: "error",
          title: "The two passwords are not the same!",
          isClosable: true,
        });
      } else if (
        values.firstName.length === 0 ||
        values.lastName.length === 0 ||
        values.email.length === 0 ||
        values.password.length === 0 ||
        values.passwordAgain.length === 0
      ) {
        toast({
          status: "error",
          title: "You must fill in all of the boxes!",
          isClosable: true,
        });
      } else {
        setSubmitting(true);
        createUser(
          values.firstName + " " + values.lastName,
          values.email,
          values.password,
          { loggedIn, setLoggedIn, setUser, setToken },
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
        <FormLabel htmlFor="firstName">First name:</FormLabel>
        <Input
          name="firstName"
          onChange={(e) => setValue("firstName", e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="lastName">Last name:</FormLabel>
        <Input
          name="lastName"
          onChange={(e) => setValue("lastName", e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
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
      <FormControl mt={4}>
        <FormLabel htmlFor="passwordAgain">Password again:</FormLabel>
        <Input
          name="passwordAgain"
          type="password"
          onChange={(e) => setValue("passwordAgain", e.target.value)}
        />
      </FormControl>
      <Center>
        <Button
          mt={4}
          colorScheme="purple"
          type="submit"
          isLoading={submitting}
        >
          Register
        </Button>
      </Center>
    </form>
  );
}
