import * as React from "react";
import { Button, HStack, Select, Tooltip } from "@chakra-ui/react";

export default function Toolbar() {
  return (
    <HStack>
      <Tooltip placement="bottom" label="asfasfsafsaf" openDelay={500}>
        <Select variant="filled">
          <option value="1">Method</option>
          <option value="2">Color Method</option>
        </Select>
      </Tooltip>
      <Tooltip placement="bottom" label="asfasfsafsaf"openDelay={500}>
        <Button>Generate!</Button>
      </Tooltip>
    </HStack>
  );
}
