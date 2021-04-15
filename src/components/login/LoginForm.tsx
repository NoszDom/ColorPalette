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
  const [email, setEmail] = React.useState<string>("");
  const [pw, setPw] = React.useState<string>("");

  return (
    <Stack spacing={4}>
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
      <Button
        colorScheme="purple"
        type="submit"
        alignSelf="center"
        onClick={() => alert(email + " " + pw)}
      >
        Log in
      </Button>
    </Stack>
  );
}
