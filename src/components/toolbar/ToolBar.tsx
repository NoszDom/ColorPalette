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
  HStack,
} from "@chakra-ui/react";
import Generator from "./Generator";
import axios from "axios";
import { targetApiUrl } from "../../network/config";
import Brightness from "./Brightness";
import Contrast from "./Contrast";
import Saturation from "./Saturation";
import Hue from "./Hue";
import ImgPaletteGenerator from "./ImgPaletteGenerator";
import { useMutation } from "react-query";

export interface ToolBarParams {
  userId?: number;
  colors: Array<string>;
  setColors: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function ToolBar({ userId, colors, setColors }: ToolBarParams) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paletteName, setPaletteName] = React.useState<string>("");
  const toast = useToast();
  const ref = React.useRef(null);

  const save = useMutation(
    () => {
      return axios.post(targetApiUrl + "/colorpalettes/", {
        name: paletteName,
        colors: JSON.stringify(colors),
        creatorId: userId,
      });
    },
    {
      onSuccess: () => {
        onClose();
        setPaletteName("");
        toast({
          status: "success",
          title: paletteName + " saved!",
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Couldn't save " + paletteName,
          status: "error",
          isClosable: true,
        });
      },
    }
  );

  async function savePalette() {
    if (paletteName === "") {
      toast({
        status: "error",
        title: "You must enter a name!",
        isClosable: true,
      });
    } else {
      save.mutateAsync();
    }
  }

  return (
    <Flex h="55px" fontSize="xl" ml={5} mr={5} flexWrap="wrap" align="center">
      <HStack spacing={4}>
        <Generator colors={colors} setColors={setColors} />
        <Brightness colors={colors} setColors={setColors}></Brightness>
        <Contrast colors={colors} setColors={setColors}></Contrast>
        <Saturation colors={colors} setColors={setColors}></Saturation>
        <Hue colors={colors} setColors={setColors}></Hue>
        <ImgPaletteGenerator
          colors={colors}
          setColors={setColors}
        ></ImgPaletteGenerator>
      </HStack>
      {!userId ? null : (
        <>
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
                {save.isLoading ? (
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
        </>
      )}
    </Flex>
  );
}
