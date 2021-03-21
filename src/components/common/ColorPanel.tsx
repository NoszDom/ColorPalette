import * as React from "react";
import { Center, Heading } from "@chakra-ui/react";
import hexRgb from "hex-rgb";
import axios from "axios";

export interface ColorPanelParams {
  color: string;
  width: number;
  height: number;
  fontSize: string;
}

export default function ColorPanel({
  color,
  width,
  height,
  fontSize,
}: ColorPanelParams) {
  const widthString: string = width.toString() + "%";
  const heightString: string = height.toString() + "%";
  const textColor: string = isTextBlack(color) ? "#000000" : "#ffffff";

  return (
    <Center w={widthString} h={heightString} bg={color}>
      <Heading color={textColor} size={fontSize}>
        {color}
      </Heading>
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
