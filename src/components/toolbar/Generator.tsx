import * as React from "react";
import { Button, HStack, Select, Tooltip } from "@chakra-ui/react";

export default function Toolbar() {
  return (
    <HStack>
      <Tooltip
        placement="bottom"
        label="Choose the generating method."
        openDelay={500}
      >
        <Select variant="filled">
          <option value="1">Method</option>
          <option value="2">Color Method</option>
        </Select>
      </Tooltip>
      <Tooltip placement="bottom" openDelay={500}>
        <Button colorScheme="purple" w ="130px">Generate!</Button>
      </Tooltip>
    </HStack>
  );
}
