import * as React from "react";
import {
  Center,
  Box,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { User } from "../models/User";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";

export interface LoginPageParams {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginPage({
  loggedIn,
  setLoggedIn,
  setUser,
  setToken,
}: LoginPageParams) {

  return (
    <Center h="calc(100% - 56px)" overflowY="auto" padding="20px">
      <Box fontSize="xl" spacing={6} minWidth="300px" h="100%">
        <Tabs isFitted colorScheme="purple" variant="enclosed">
          <TabList>
            <Tab fontWeight="bold">Log in</Tab>
            <Tab fontWeight="bold">Register</Tab>
          </TabList>
          <TabPanels
            borderBottomRadius="xl"
            borderWidth="1px"
            fontSize="xl"
            minWidth="300px"
          >
            <TabPanel>
              <LoginForm
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setUser={setUser}
                setToken={setToken}
              />
            </TabPanel>
            <TabPanel>
              <RegisterForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}
