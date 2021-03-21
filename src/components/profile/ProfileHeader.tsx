import * as React from "react";
import { Avatar, Center, Heading, VStack } from "@chakra-ui/react";

export interface ProfileHeaderParams {
  name: string;
}

export default function ProfileHeader({ name }: ProfileHeaderParams) {
  return (
    <Center mt={7} mb={7}>
      <VStack>
        <Avatar name={name} size="2xl" />
        <Heading>{name}</Heading>
      </VStack>
    </Center>
  );
}
