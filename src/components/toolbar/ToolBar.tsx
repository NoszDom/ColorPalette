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
  Spinner,
} from "@chakra-ui/react";
import Generator from "./Generator";
import axios from "axios";
import { targetApiUrl } from "../../network/Config";

export interface ToolBarParams {
  userId?: number;
  colors: Array<string>;
  setColors: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function ToolBar({ userId, colors, setColors }: ToolBarParams) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paletteName, setPaletteName] = React.useState<string>("");
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const toast = useToast();
  const ref = React.useRef(null);

  async function savePalette() {
    setSubmitting(true);
    if (paletteName === "") {
      toast({
        status: "error",
        title: "You must enter a name!",
        isClosable: true,
      });
    } else {
      axios
        .post(targetApiUrl + "/colorpalettes/", {
          name: paletteName,
          colors: JSON.stringify(colors),
          creatorId: userId,
        })
        .then(() => {
          onClose();
          setPaletteName("");
          setSubmitting(false);
          toast({
            status: "success",
            title: paletteName + " saved!",
            isClosable: true,
          });
        });
    }
  }

  if (!!userId) {
    return (
      <Flex h="55px" fontSize="xl" ml={5} mr={5}>
        <Generator colors={colors} setColors={setColors} />
        <Spacer />
        <Center>
          <Button colorScheme="purple" onClick={onOpen}>
            Save & share
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
                  ref={ref}
                  id="name"
                  value={paletteName}
                  onChange={(e) => setPaletteName(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              {submitting ? (
                <Center width="100%" height="30px">
                  <Spinner size="md"></Spinner>
                </Center>
              ) : (
                <>
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
                  <Button colorScheme="purple" onClick={savePalette}>
                    Save
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  } else {
    return (
      <Flex h="55px" fontSize="xl" ml={5} mr={5}>
        <Generator colors={colors} setColors={setColors} />
      </Flex>
    );
  }
}
