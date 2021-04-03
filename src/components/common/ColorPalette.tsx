import * as React from "react";
import { Flex } from "@chakra-ui/react";
import ColorPanel from "./ColorPanel";

export interface ColorPaletteParams {
  colors: string[];
  height: string;
  fontSize: string;
  editable?: boolean;
  setColors?: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ColorPalette({
  colors,
  height,
  fontSize,
  editable,
  setColors,
}: ColorPaletteParams) {
  const h: number = 100;
  const w: number = 100 / colors.length;

  return (
    <Flex w="100%" h={height}>
      {colors.map((value: string, index: number) => {
        return (
          <ColorPanel
            colors={colors}
            index={index}
            height={h}
            width={w}
            fontSize={fontSize}
            key={index}
            editable={editable}
            setColors={setColors}
          />
        );
      })}
    </Flex>
  );
}
