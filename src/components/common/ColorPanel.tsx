import * as React from "react";
import { Center, Heading, VStack } from "@chakra-ui/react";
import hexRgb from "hex-rgb";
import ColorPickerPopUp from "./ColorPickerPopUp";

export interface ColorPanelParams {
  colors: Array<string>;
  index: number;
  width: number;
  height: number;
  fontSize: string;
  editable?: boolean;
  setColors?: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ColorPanel({
  colors,
  index,
  width,
  height,
  fontSize,
  editable,
  setColors,
}: ColorPanelParams) {
  const widthString: string = width.toString() + "%";
  const heightString: string = height.toString() + "%";
  const textColor: string = isTextBlack(colors[index]) ? "black" : "white";

  const colorPicker = editable
    ? ColorPickerPopUp({ textColor: textColor, colors: colors, setColors: setColors, index: index })
    : null;

  return (
    <Center w={widthString} h={heightString} bg={colors[index]}>
      <VStack>
        <Heading color={textColor} size={fontSize}>
          {colors[index]}
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

function calculateLuminanceComponent(color: number) {
  const result: number =
    color / 255 <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ^ 2.4;
  return result;
}
