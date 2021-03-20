import * as React from "react";
import {HStack, Button} from "@chakra-ui/react";


export default function SaveOptions() {
  return (
    <HStack>
        <Button variant="outline" colorScheme="purple">
            Save As
        </Button>
        <Button colorScheme="purple">
            Save
        </Button>
    </HStack>
  );
}
