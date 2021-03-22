import * as React from "react";
import { Link, SimpleGrid, Center } from "@chakra-ui/react";
import {Link as RouteLink} from "react-router-dom";


export interface PageLinksParams {
  columns: number;
}

export default function PageLinks({ columns }: PageLinksParams) {
  return (
    <SimpleGrid columns={columns} spacing={10}>
      <Center>
        <Link as={RouteLink} to="/">Browse</Link>
      </Center>
      <Center>
        <Link as={RouteLink} to="/generator">Generator</Link>
      </Center>
    </SimpleGrid>
  );
}
