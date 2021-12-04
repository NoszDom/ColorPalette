import * as React from "react";
import { Center, Heading, VStack } from "@chakra-ui/react";
import convert from "color-convert";
import ColorPickerPopUp from "./ColorPickerPopUp";

export interface ColorPanelParams {
  colors: Array<string>;
  index: number;
  width: number;
  height: number;
  fontSize?: string;
  editable?: boolean;
  setColors?: React.Dispatch<React.SetStateAction<string[]>>;
  noText?: boolean;
}

export default function ColorPanel({
  colors,
  index,
  width,
  height,
  fontSize,
  editable,
  setColors,
  noText,
}: ColorPanelParams) {
  const widthString: string = width.toString() + "%";
  const heightString: string = height.toString() + "%";
  const textColor: string =
    !noText && isTextBlack(colors[index]) ? "black" : "white";

  const colorPicker = editable
    ? ColorPickerPopUp({
        textColor: textColor,
        colors: colors,
        setColors: setColors,
        index: index,
      })
    : null;

  return (
    <Center w={widthString} h={heightString} bg={colors[index]}>
      <VStack>
        {noText ? null : (
          <Heading color={textColor} size={fontSize}>
            {colors[index]}
          </Heading>
        )}
        {colorPicker}
      </VStack>
    </Center>
  );
}

function isTextBlack(color: string) {
  const rgb: Array<number> = convert.hex.rgb(color);

  const textColor = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

  const result: boolean = textColor > 125 ? true : false;
  return result;
}
