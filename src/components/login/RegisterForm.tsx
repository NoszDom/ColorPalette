import * as React from "react";
import {
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  Button,
  Stack,
} from "@chakra-ui/react";

export default function LoginForms() {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [pw, setPw] = React.useState<string>("");
  const [pwAg, setPwAg] = React.useState<string>("");

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel htmlFor="first-name">First name:</FormLabel>
        <Input
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="last-name">Last name:</FormLabel>
        <Input
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password:</FormLabel>
        <Input
          id="password"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password-again">Password again:</FormLabel>
        <Input
          id="password-again"
          type="password"
          value={pwAg}
          onChange={(e) => setPwAg(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="purple"
        type="submit"
        alignSelf="center"
        onClick={() => alert(firstName + " " + lastName + " " +email + " " + pw)}
      >
        Register
      </Button>
    </Stack>
  );
}
