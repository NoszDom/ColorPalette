import * as React from "react";
import { Wrap, WrapItem, Flex, Spacer, Center } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import PageLinks from "./PageLinks";
import Profile from "./Profile";

export interface NavBarParams {
  name: string;
  columns: number;
}

export default function NavBar({ name, columns }: NavBarParams) {
  return (
    <Flex h="55px" fontSize="xl" ml={5} mr={5}>
      <PageLinks columns={columns} />
      <Spacer />
      <Center>
        <Wrap>
          <WrapItem>
            <Profile name={name} />
          </WrapItem>
          <WrapItem>
            <ColorModeSwitcher />
          </WrapItem>
        </Wrap>
      </Center>
    </Flex>
  );
}
