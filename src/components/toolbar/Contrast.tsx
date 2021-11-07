import * as React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import {
  RiContrastFill,
  RiCheckboxBlankCircleLine,
  RiCheckboxBlankCircleFill,
} from "react-icons/ri";

import ColorPalette from "../common/ColorPalette";
import convert from "color-convert";

export interface ContrastParams {
  colors: Array<string>;
  setColors: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function Contrast({ colors, setColors }: ContrastParams) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [preview, setPreview] = React.useState<Array<string>>(colors);

  React.useEffect(() => {
    setPreview(colors);
  }, [colors]);

  function calculateColors(contrast: number) {
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    let rgbColors: Array<Array<number>> = colors.map((c) => convert.hex.rgb(c));

    rgbColors = rgbColors.map((c) => {
      return c.map((i) =>
        Math.max(0, Math.min(255, Math.trunc(factor * (i - 128) + 128)))
      );
    });

    const hexColors = rgbColors.map(
      (c) => "#" + convert.rgb.hex(c[0], c[1], c[2])
    );
    setPreview(hexColors);
  }

  return (
    <>
      <Tooltip label="Contrast">
        <IconButton
          aria-label="Pick a color"
          size="md"
          fontSize="2xl"
          icon={<RiContrastFill />}
          variant="ghost"
          isRound={true}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change contrast:</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <HStack spacing={3} paddingTop={3} paddingBottom={3}>
              <RiCheckboxBlankCircleLine size={24} />
              <Slider
                defaultValue={0}
                min={-128}
                max={128}
                colorScheme="purple"
                onChange={(e) => calculateColors(e)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <RiCheckboxBlankCircleFill size={24} />
            </HStack>
            <Text>Preview:</Text>
            <Box width="100%" height="100px" rounded="xl" overflow="hidden">
              <ColorPalette
                height="100%"
                fontSize="md"
                colors={preview}
                noText={true}
              ></ColorPalette>
            </Box>
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
            <Button
              colorScheme="purple"
              onClick={() => {
                setColors(preview);
                onClose();
              }}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
