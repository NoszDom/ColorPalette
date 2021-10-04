import * as React from "react";
import {
  Flex,
  Spacer,
  Heading,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { ColorPalette } from "../../models/ColorPalette";
import axios from "axios";
import { targetApiUrl } from "../../network/Config";

export interface FooterParams {
  height: string;
  palette: ColorPalette;
  userId?: number;
}

export default function PaletteFooter({
  height,
  userId,
  palette,
}: FooterParams) {
  const toast = useToast();

  const [saved, setSaved] = React.useState<boolean>(palette.savedByCurrentUser);

  const button =
    palette.creatorId === userId ? (
      <IconButton
        variant="ghost"
        aria-label="Delete item"
        icon={<FiTrash2 />}
        fontSize="md"
        onClick={() => deletePalette()}
      />
    ) : (
      <IconButton
        variant="ghost"
        aria-label="Save item"
        icon={saved ? <MdBookmark /> : <MdBookmarkBorder />}
        fontSize="md"
        onClick={() => (saved ? unSavePalette() : savePalette())}
      />
    );

  async function deletePalette() {
    axios.delete(targetApiUrl + "/colorpalettes/" + palette.id).then(() =>
      toast({
        status: "success",
        title: palette.name + " deleted!",
        isClosable: true,
      })
    );
  }

  async function savePalette() {
    axios
      .post(targetApiUrl + "/saves/", {
        userId: userId,
        colorPaletteId: palette.id,
      })
      .then(() => {
        setSaved(true);
      });
  }

  async function unSavePalette() {
    axios
      .delete(targetApiUrl + "/saves/" + palette.id + "/" + userId)
      .then(() => {
        setSaved(false);
      });
  }

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
        {userId ? null : button}
      </Flex>
    </Tooltip>
  );
}
