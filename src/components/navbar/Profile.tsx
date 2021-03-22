import * as React from "react";
import { Avatar, Button, Center, HStack } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

export interface ProfileParams {
  name: string;
}

export default function Profile({ name }: ProfileParams) {
  return (
    <RouteLink to="/myprofile">
      <Button variant="ghost">
        <Center h="100%">
          <HStack>
            <Center h="100%" mr={1} fontSize="lg">
              {name}
            </Center>
            <Avatar name={name} size="sm" />
          </HStack>
        </Center>
      </Button>
    </RouteLink>
  );
}
