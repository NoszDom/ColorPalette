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
import { targetApiUrl } from "../../network/config";
import { useMutation } from "react-query";

export interface ChangeNameButtonParams {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function ChangeNameButton({
  user,
  setUser,
}: ChangeNameButtonParams) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [firstName, setFirstName] = React.useState<string>(
    user.name ? user.name.split(" ")[0] : ""
  );
  const [lastName, setLastName] = React.useState<string>(
    user.name ? user.name.split(" ")[1] : ""
  );

  const toast = useToast();

  const save = useMutation(
    () => {
      return axios.put(targetApiUrl + "/users/edit/name", {
        id: user.id,
        name: firstName + " " + lastName,
      });
    },
    {
      onSuccess: () => {
        setUser((prev) => ({ ...prev, name: firstName + " " + lastName }));

        toast({
          title: "Name changed successfully!",
          status: "success",
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Couldn't change name address.",
          status: "error",
          isClosable: true,
        });
      },
    }
  );

  function clickSave() {
    if (firstName === "" || lastName === "") {
      toast({
        title: "Please fill all of the fields!",
        status: "error",
        isClosable: true,
      });
    } else if (firstName + " " + lastName === user.name) {
      toast({
        title: "Name cannot match your current name!",
        status: "error",
        isClosable: true,
      });
    } else {
      save.mutateAsync();
    }
  }

  function close() {
    onClose();
    if (user.name) {
      setFirstName(user.name.split(" ")[0]);
      setLastName(user.name.split(" ")[1]);
    }
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
        <PopoverHeader fontWeight="bold">Edit name:</PopoverHeader>
        <PopoverBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="first-name">First name:</FormLabel>
              <Input
                ref={React.useRef(null)}
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="last-name">Last name:</FormLabel>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
              <Button colorScheme="purple" onClick={() => clickSave()}>
                Save
              </Button>
            </ButtonGroup>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
