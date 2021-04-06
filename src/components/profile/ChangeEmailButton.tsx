import * as React from "react";
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Input,
  Button,
  ButtonGroup,
  Stack,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { User } from "../../App";
import axios from "axios";

export interface ChangeEmailButtonParams {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function ChangeEmailButton({
  user,
  setUser,
}: ChangeEmailButtonParams) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [email, setEmail] = React.useState<string>(user.email);
  const toast = useToast();

  function clickSave() {
    if (!email.includes("@")) {
      toast({
        title: "Please type in a valid e-mail address!",
        status: "error",
        isClosable: true,
      });
    } else {
      if (email === user.email) {
        toast({
          title: "E-mail address cannot match your current address!",
          status: "error",
          isClosable: true,
        });
      } else {
        axios
          .put("https://localhost:44330/api/users/edit/email", {
            id: user.id,
            email: email,
          })
          .then(() => {
            setUser( (prev) => ({...prev, email: email}));

            toast({
              title: "Email address changed successfully!",
              status: "success",
              isClosable: true,
            });
          });
      }
    }
  }

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={React.useRef(null)}
      onOpen={onOpen}
      onClose={() => {
        onClose();
        setEmail(user.email);
      }}
      placement="right"
    >
      <PopoverTrigger>
        <IconButton
          fontSize="xl"
          colorScheme="purple"
          icon={<AiOutlineEdit />}
          aria-label="edit_name"
          variant="outline"
          border="none"
          ml="15px"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Edit e-mail adress:</PopoverHeader>
        <PopoverBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="email">New email adress:</FormLabel>
              <Input
                ref={React.useRef(null)}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <ButtonGroup d="flex" justifyContent="flex-end">
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  setEmail(user.email);
                }}
                colorScheme="purple"
              >
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                onClick={() => {
                  clickSave();
                }}
              >
                Save
              </Button>
            </ButtonGroup>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
