import * as React from "react";
import {
  Flex,
  Spacer,
  Button,
  Center,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Divider,
} from "@chakra-ui/react";
import Generator from "./Generator";
import axios from "axios";

export interface ToolBarParams {
  userId: number;
  colors: Array<string>;
}

export default function ToolBar({ userId, colors }: ToolBarParams) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paletteName, setPaletteName] = React.useState<string>("");
  const toast = useToast();

  async function savePalette() {
    if (paletteName === "") {
      toast({
        status: "error",
        title: "You must enter a name!",
        isClosable: true,
      });
    } else {
      axios
        .post("https://localhost:44330/api/colorpalettes/", {
          name: paletteName,
          colors: JSON.stringify(colors),
          creatorId: userId,
        })
        .then(() => {
          onClose();
          toast({
            status: "success",
            title: paletteName + " saved!",
            isClosable: true,
          });
        });
    }
  }

  return (
    <Flex h="55px" fontSize="xl" ml={5} mr={5}>
      <Generator />
      <Spacer />
      <Center>
        <Button colorScheme="purple" onClick={onOpen}>
          Save
        </Button>
      </Center>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setPaletteName("");
        }}
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Name your palette:</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Enter the name here:</FormLabel>
              <Input
                ref={React.useRef(null)}
                id="name"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={() => {
                onClose();
                setPaletteName("");
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button colorScheme="purple" onClick={() => savePalette()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
