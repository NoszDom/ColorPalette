import * as React from "react";
import { Link, SimpleGrid, Center } from "@chakra-ui/react";

export interface PageLinksParams {
  columns: number;
}

export default function PageLinks({ columns }: PageLinksParams) {
  return (
    <SimpleGrid columns={columns} spacing={10}>
      <Center>
        <Link>Explore</Link>
      </Center>
      <Center>
        <Link>Generate</Link>
      </Center>
    </SimpleGrid>
  );
}
