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
import { RiContrastDropFill, RiDropFill, RiDropLine } from "react-icons/ri";
import ColorPalette from "../common/ColorPalette";
import convert from "color-convert";

export interface SaturationParams {
  colors: Array<string>;
  setColors: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function Saturation({ colors, setColors }: SaturationParams) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [preview, setPreview] = React.useState<Array<string>>(colors);

  React.useEffect(() => {
    setPreview(colors);
  }, [colors]);

  function calculateColors(percent: number) {
    const multiplier = 1 + percent / 100;

    let hsvColors: Array<Array<number>> = colors.map((c) => convert.hex.hsv(c));

    hsvColors = hsvColors.map((c) => {
      c[1] = Math.max(0, Math.min(100, Math.trunc(c[1] * multiplier)));
      return c;
    });

    const hexColors = hsvColors.map(
      (c) => "#" + convert.hsv.hex([c[0], c[1], c[2]])
    );
    setPreview(hexColors);
  }

  return (
    <>
      <Tooltip label="Saturation">
        <IconButton
          aria-label="Pick a color"
          size="md"
          fontSize="2xl"
          icon={<RiContrastDropFill />}
          variant="ghost"
          isRound={true}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change saturation:</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <HStack spacing={3} paddingTop={3} paddingBottom={3}>
              <RiDropLine size={24} />
              <Slider
                defaultValue={0}
                min={-100}
                max={100}
                colorScheme="purple"
                onChange={(e) => calculateColors(e)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <RiDropFill size={24} />
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
