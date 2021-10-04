import * as React from "react";
import { Link, SimpleGrid, Center } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

export interface PageLinksParams {
  isLoggedIn: boolean;
}

export default function PageLinks({ isLoggedIn }: PageLinksParams) {
  if (isLoggedIn)
    return (
      <SimpleGrid columns={4} spacing={4}>
        <Center>
          <Link as={RouteLink} to="/generator">
            Generator
          </Link>
        </Center>
        <Center>
          <Link as={RouteLink} to="/browse">
            Browse
          </Link>
        </Center>
        <Center>
          <Link as={RouteLink} to="/saved">
            Saved
          </Link>
        </Center>
        <Center>
          <Link as={RouteLink} to="/own">
            Own
          </Link>
        </Center>
      </SimpleGrid>
    );
  else
    return (
      <SimpleGrid columns={2} spacing={4}>
        <Center>
          <Link as={RouteLink} to="/generator">
            Generator
          </Link>
        </Center>
        <Center>
          <Link as={RouteLink} to="/browse">
            Browse
          </Link>
        </Center>
      </SimpleGrid>
    );
}
