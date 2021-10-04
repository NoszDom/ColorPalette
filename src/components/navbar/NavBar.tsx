import * as React from "react";
import { Wrap, WrapItem, Flex, Spacer, Center } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import PageLinks from "./PageLinks";
import Profile from "./Profile";

export interface NavBarParams {
  name?: string;
  isLoggedIn: boolean;
}

export default function Navbar({ name, isLoggedIn }: NavBarParams) {
  return (
    <Flex h="55px" fontSize="xl" ml={5} mr={5}>
      <PageLinks isLoggedIn={isLoggedIn} />
      <Spacer />
      <Center>
        <Wrap>
          <WrapItem>
            <Profile isLoggedIn={isLoggedIn} name={name ? name : undefined} />
          </WrapItem>
          <WrapItem>
            <ColorModeSwitcher />
          </WrapItem>
        </Wrap>
      </Center>
    </Flex>
  );
}
