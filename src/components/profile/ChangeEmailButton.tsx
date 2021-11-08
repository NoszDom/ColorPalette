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
import { User } from "../../models/User";
import axios from "axios";
import { targetApiUrl } from "../../network/Config";
import { useMutation } from "react-query";

export interface ChangeEmailButtonParams {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function ChangeEmailButton({
  user,
  setUser,
}: ChangeEmailButtonParams) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [email, setEmail] = React.useState<string>(
    user.email ? user.email : ""
  );
  const toast = useToast();

  const save = useMutation(
    () => {
      return axios.put(targetApiUrl + "/users/edit/email", {
        id: user.id,
        email: email,
      });
    },
    {
      onSuccess: () => {
        setUser((prev) => ({ ...prev, email: email }));

        toast({
          title: "Email address changed successfully!",
          status: "success",
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Couldn't change email address.",
          status: "error",
          isClosable: true,
        });
      },
    }
  );

  function clickSave() {
    if (!email.includes("@")) {
      toast({
        title: "Please type in a valid e-mail address!",
        status: "error",
        isClosable: true,
      });
    } else if (email === user.email) {
      toast({
        title: "E-mail address cannot match your current address!",
        status: "error",
        isClosable: true,
      });
    } else {
      save.mutateAsync();
    }
  }

  function close() {
    onClose();
    if (user.email) setEmail(user.email);
  }

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={React.useRef(null)}
      onOpen={onOpen}
      onClose={() => {
        close();
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
                  close();
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
