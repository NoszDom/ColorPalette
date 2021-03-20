import * as React from "react";
import { Flex } from "@chakra-ui/react";
import ColorPanel from "../common/ColorPanel";

export interface ColorPaletteParams {
  colors: string[];
  height: string;
}

export default function ColorPalette({ colors, height }: ColorPaletteParams) {
  
  const h: number = 100;
  const w: number = 100 / colors.length;

  return (
    <Flex w="100%" bg="tomato" h={height}>
      {colors.map((value, index) => {
        return <ColorPanel color={value} height={h} width={w} />;
      })}
    </Flex>
  );
}
