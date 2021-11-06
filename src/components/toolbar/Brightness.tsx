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
} from "@chakra-ui/react";
import { ImBrightnessContrast } from "react-icons/im";
import {
  BsFillBrightnessLowFill,
  BsFillBrightnessHighFill,
} from "react-icons/bs";
import ColorPalette from "../common/ColorPalette";
import convert from "color-convert";

export interface BrightnessParams {
  colors: Array<string>;
  setColors: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function Brightness({ colors, setColors }: BrightnessParams) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [preview, setPreview] = React.useState<Array<string>>(colors);

  React.useEffect(() => {
    setPreview(colors);
  }, [colors]);

  function calculateColors(percent: number) {
    const multiplier = 1 + percent / 100;

    let rgbColors: Array<Array<number>> = colors.map((c) => convert.hex.rgb(c));

    rgbColors = rgbColors.map((c) => {
      return c.map((i) =>
        Math.max(0, Math.min(255, Math.trunc(i * multiplier)))
      );
    });

    const hexColors = rgbColors.map(
      (c) => "#" + convert.rgb.hex(c[0], c[1], c[2])
    );
    setPreview(hexColors);
  }

  return (
    <>
      <IconButton
        aria-label="Pick a color"
        size="md"
        fontSize="2xl"
        icon={<ImBrightnessContrast />}
        variant="ghost"
        isRound={true}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change brightness:</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <HStack spacing={3} paddingTop={3} paddingBottom={3}>
              <BsFillBrightnessLowFill size={24} />
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
              <BsFillBrightnessHighFill size={24} />
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
