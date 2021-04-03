import * as React from "react";
import {
  IconButton,
  Box,
  Slider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  HStack,
  PopoverHeader,
  Flex,
  Spacer,
  Input,
} from "@chakra-ui/react";
import { CgColorPicker } from "react-icons/cg";
import hexRgb from "hex-rgb";
import rgbHex from "rgb-hex";
import hexColorRegex from "hex-color-regex";

export interface ColorPickerParams {
  textColor: string;
  colors: Array<string>;
  setColors?: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
}

export default function ColorPickerPopUp({
  textColor,
  colors,
  setColors,
  index,
}: ColorPickerParams) {
  const [rgb, setRgb] = React.useState<Array<number>>(
    hexRgb(colors[index], { format: "array" })
  );
  const[hex, setHex] = React.useState<string>(colors[index]);

  function rgbChanged() {
    const tmp = colors;
    tmp[index] = "#" + rgbHex(rgb[0], rgb[1], rgb[2]);
    setColors!(tmp);
    setHex(colors[index]);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="Pick a color"
          size="md"
          color={textColor}
          fontSize="2xl"
          icon={<CgColorPicker />}
          variant="outline"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="bold">Pick a color!</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <Box padding="10px">
          <Stack>
            <Flex alignItems="center">
              <Text fontWeight="bold">Red</Text>
              <Spacer />
              <NumberInput
                value={rgb[0]}
                min={0}
                max={255}
                size="sm"
                onChange={(value) => {
                  setRgb([+value, rgb[1], rgb[2]]);
                  rgbChanged();
                }}
              >
                <NumberInputField width="75px" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Slider
              aria-label="slider-red"
              value={rgb[0]}
              min={0}
              max={255}
              step={1}
              onChange={(value) => {
                setRgb([+value, rgb[1], rgb[2]]);
                rgbChanged();
              }}
            >
              <SliderTrack h="12px" bgGradient="linear(to-r, #000000, #ff0000)">
                <SliderFilledTrack bgColor="transparent" />
              </SliderTrack>
              <SliderThumb h="20px" w="20px" />
            </Slider>

            <Flex alignItems="center">
              <Text fontWeight="bold">Green</Text>
              <Spacer />
              <NumberInput
                value={rgb[1]}
                min={0}
                max={255}
                size="sm"
                onChange={(value) => {
                  setRgb([rgb[0], +value, rgb[2]]);
                  rgbChanged();
                }}
              >
                <NumberInputField width="75px" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Slider
              aria-label="slider-green"
              value={rgb[1]}
              min={0}
              max={255}
              step={1}
              onChange={(value) => {
                setRgb([rgb[0], +value, rgb[2]]);
                rgbChanged();
              }}
            >
              <SliderTrack h="12px" bgGradient="linear(to-r, #000000, #00ff00)">
                <SliderFilledTrack bgColor="transparent" />
              </SliderTrack>
              <SliderThumb h="20px" w="20px" />
            </Slider>

            <Flex alignItems="center">
              <Text fontWeight="bold">Blue</Text>
              <Spacer />
              <NumberInput
                value={rgb[2]}
                min={0}
                max={255}
                size="sm"
                onChange={(value) => {
                  setRgb([rgb[0], rgb[1], +value]);
                  rgbChanged();
                }}
              >
                <NumberInputField width="75px" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Slider
              aria-label="slider-blue"
              value={rgb[2]}
              min={0}
              max={255}
              step={1}
              onChange={(value) => {
                setRgb([rgb[0], rgb[1], +value]);
                rgbChanged();
              }}
            >
              <SliderTrack h="12px" bgGradient="linear(to-r, #000000, #0000ff)">
                <SliderFilledTrack bgColor="transparent" />
              </SliderTrack>
              <SliderThumb h="20px" w="20px" />
            </Slider>

            <HStack spacing={6}>
              <Text fontWeight="bold">HEX</Text>
              <Input
                id="hexInput"
                w="80px"
                size="sm"
                maxLength={7}
                value={hex}
                onChange={(e) => {
                  setHex(e.target.value);
                  if (hexColorRegex({strict: true}).test(e.target.value)){
                    const tmp = colors;
                    tmp[index] = e.target.value;
                    setColors!(tmp);
                  }
                }}
                onBlur={() => setHex(colors[index])}
              />

            </HStack>
          </Stack>
        </Box>
      </PopoverContent>
    </Popover>
  );
}
