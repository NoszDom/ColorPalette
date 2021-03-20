import * as React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import Generator from "./Generator";
import SaveOptions from "./SaveOptions";

export default function Toolbar() {
  return (
    <Flex h="55px" fontSize="xl" ml={5} mr={5}>
      <Generator/>
      <Spacer/>
      <SaveOptions/>
    </Flex>
  );
}
