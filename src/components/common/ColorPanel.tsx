import * as React from "react";
import {
  Center,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import hexRgb from "hex-rgb";
import { ChromePicker } from "react-color";
import { CgColorPicker } from "react-icons/cg";

export interface ColorPanelParams {
  color: string;
  width: number;
  height: number;
  fontSize: string;
  editable?: boolean;
}

export default function ColorPanel({
  color,
  width,
  height,
  fontSize,
  editable,
}: ColorPanelParams) {
  const widthString: string = width.toString() + "%";
  const heightString: string = height.toString() + "%";
  const textColor: string = isTextBlack(color) ? "black" : "white";

  const colorPicker = editable ? colorPick(textColor, color) : <span></span>;

  return (
    <Center w={widthString} h={heightString} bg={color}>
      <VStack>
       <Heading color={textColor} size={fontSize}>
        {color}
        </Heading>
        {colorPicker}
      </VStack>
    </Center>
  );
}

function isTextBlack(color: string) {
  const rgb: Array<number> = hexRgb(color, { format: "array" });
  const red: number = calculateLuminanceComponent(rgb[0]);
  const green: number = calculateLuminanceComponent(rgb[1]);
  const blue: number = calculateLuminanceComponent(rgb[2]);

  const luminance: number = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  const result: boolean =
    (luminance + 0.05) / (0.0 + 0.05) > (1.0 + 0.05) / (luminance + 0.05)
      ? true
      : false;
  return result;
}

function colorPick(textColor: string, color : string) {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          color={textColor}
          icon={<CgColorPicker />}
          variant="ghost"
          aria-label="Pick color"
          fontSize="2xl"
        />
      </PopoverTrigger>
      <PopoverContent color="white">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Pick a color
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <ChromePicker color ={color}/>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function calculateLuminanceComponent(color: number) {
  const result: number =
    color / 255 <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ^ 2.4;
  return result;
}
