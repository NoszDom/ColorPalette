import * as React from "react";
import { Flex, Spacer, Heading, IconButton, Tooltip } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

export interface FooterParams {
  height: string;
  isOwn: boolean;
  isSaved?: boolean;
  title: string;
  creatorID: number;
  saves?: number;
}

export default function PaletteFooter({
  height,
  isOwn,
  isSaved,
  title,
  creatorID,
  saves,
}: FooterParams) {
  const button = isOwn ? (
    <IconButton
      variant="ghost"
      aria-label="Delete item"
      icon={<FiTrash2 />}
      fontSize="md"
    />
  ) : (
    <IconButton
      variant="ghost"
      aria-label="Save item"
      icon={isSaved ? <MdBookmark /> : <MdBookmarkBorder />}
      fontSize="md"
    />
  );

  return (
    <Tooltip
      label={[
        saves + " saves",
        <br key="enter" />,
        "Made by " + creatorID
      ]}
      shouldWrapChildren
      w="300"
      placement="bottom-start"
    >
      <Flex h={height} align="center" ml={3} mr={2} overflow="hidden">
        <Heading size="sm">{title}</Heading>
        <Spacer />
        {button}
      </Flex>
    </Tooltip>
  );
}
