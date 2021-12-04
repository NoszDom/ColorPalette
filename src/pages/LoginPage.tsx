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
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";
import { FormParams } from "../models/FormParams";

export default function LoginPage({
  loggedIn,
  setLoggedIn,
  setUser,
  setToken,
}: FormParams) {
  return (
    <Center h="calc(100% - 56px)" overflowY="auto" padding="20px">
      <Box fontSize="xl" spacing={6} minWidth="300px" h="100%">
        <Tabs isFitted colorScheme="purple" variant="enclosed">
          <TabList>
            <Tab fontWeight="bold">Login</Tab>
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
              <RegisterForm
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setUser={setUser}
                setToken={setToken}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}
