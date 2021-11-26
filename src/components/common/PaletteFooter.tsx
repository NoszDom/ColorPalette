import * as React from "react";
import {
  Flex,
  Spacer,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Text,
  Tooltip,
  useToast,
  useDisclosure,
  Divider,
  Button,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { ColorPalette } from "../../models/ColorPalette";
import axios from "axios";
import { targetApiUrl } from "../../network/config";
import { useMutation } from "react-query";

export interface FooterParams {
  height: string;
  palette: ColorPalette;
  userId?: number;
  setRefreshPalettes: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PaletteFooter({
  height,
  userId,
  palette,
  setRefreshPalettes,
}: FooterParams) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [saved, setSaved] = React.useState<boolean>(palette.savedByCurrentUser);

  const deletePalette = useMutation(
    () => {
      return axios.delete(targetApiUrl + "/colorpalettes/" + palette.id);
    },
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: palette.name + " deleted!",
          isClosable: true,
        });
        setRefreshPalettes(true);
        onClose();
      },
      onError: () => {
        toast({
          status: "error",
          title: "Couldn't delete " + palette.name + ".",
          isClosable: true,
        });
        onClose();
      },
    }
  );

  const savePalette = useMutation(
    () => {
      return axios.post(targetApiUrl + "/saves/", {
        userId: userId,
        colorPaletteId: palette.id,
      });
    },
    {
      onSuccess: () => {
        setSaved(true);
      },
      onError: () => {
        toast({
          status: "error",
          title: "Couldn't save " + palette.name + ".",
          isClosable: true,
        });
      },
    }
  );

  const unsavePalette = useMutation(
    () => {
      return axios.delete(targetApiUrl + "/saves/" + palette.id + "/" + userId);
    },
    {
      onSuccess: () => {
        setSaved(false);
      },
      onError: () => {
        toast({
          status: "error",
          title: "Couldn't unsave " + palette.name + ".",
          isClosable: true,
        });
      },
    }
  );

  const button =
    palette.creatorId === userId ? (
      <>
        <IconButton
          variant="ghost"
          aria-label="Delete item"
          icon={<FiTrash2 />}
          fontSize="md"
          onClick={onOpen}
        />
        <Modal isOpen={isOpen} size="xs" onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete palette</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody>
              <Text>
                Are you sure you want to delete <strong>{palette.name}</strong>{" "}
                ?
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                mr={3}
                onClick={onClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => deletePalette.mutate()}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    ) : (
      <IconButton
        variant="ghost"
        aria-label="Save item"
        icon={saved ? <MdBookmark /> : <MdBookmarkBorder />}
        fontSize="md"
        onClick={() =>
          saved ? unsavePalette.mutateAsync() : savePalette.mutateAsync()
        }
      />
    );

  return (
    <Tooltip
      label={[
        palette.saves + " saves",
        <br key="enter" />,
        "Made by " + palette.creatorName,
      ]}
      shouldWrapChildren
      w="300"
      placement="bottom-start"
    >
      <Flex h={height} align="center" ml={3} mr={2} overflow="hidden">
        <Heading size="sm">{palette.name}</Heading>
        <Spacer />
        {userId === undefined ? null : button}
      </Flex>
    </Tooltip>
  );
}
