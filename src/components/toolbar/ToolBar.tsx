import * as React from "react";
import {Flex} from "@chakra-ui/react";
import Generator from "./Generator"


export default function Toolbar() {
  return (
    <Flex h="55px" fontSize="xl" ml={5} mr={5}>
      <Generator/>
    </Flex>
  );
}
