import * as React from "react";
import {
  Stack,
  VStack,
  Flex,
  Spacer,
  Avatar,
  AvatarBadge,
  Text,
  Divider,
  Box,
  Button,
} from "@chakra-ui/react";
import { User } from "../App";
import ChangePicButton from "../components/profile/ChangePicButton";
import ChangeNameButton from "../components/profile/ChangeNameButton";
import ChangeEmailButton from "../components/profile/ChangeEmailButton";
import ChangePwButton from "../components/profile/ChangePwButton";

export interface ProfileParams {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function ProfilePage({ user, setUser }: ProfileParams) {
  return (
    <VStack w="100%" h="calc(100% - 56px)" overflowY="auto" padding="20px">
      <Avatar name={user.name} size="2xl" mb="30px">
        <AvatarBadge bg="transparent" boxSize="1em">
          <ChangePicButton />
        </AvatarBadge>
      </Avatar>
      <Stack
        padding="15px"
        borderRadius="xl"
        borderWidth="1px"
        fontSize="xl"
        spacing={6}
        minWidth="300px"
      >
        <Box>
          <Text fontWeight="bold">Name:</Text>
          <Divider />
          <Flex alignItems="center">
            <Text>{user.name}</Text>
            <Spacer />
            <ChangeNameButton user={user} setUser={setUser}/>
          </Flex>
        </Box>
        <Box>
          <Text fontWeight="bold">Email:</Text>
          <Divider />
          <Flex alignItems="center">
            <Text>{user.email}</Text>
            <Spacer />
            <ChangeEmailButton user={user} setUser={setUser}/>
          </Flex>
        </Box>
        <ChangePwButton user={user} setUser={setUser}/>
        <Button colorScheme="red" alignSelf="center" variant="outline">Log out</Button>
      </Stack>
    </VStack>
  );
}
