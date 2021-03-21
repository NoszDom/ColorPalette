import * as React from "react";
import { Box, Divider } from "@chakra-ui/react";
import ColorPalette from "./ColorPalette";
import PaletteFooter from "./PaletteFooter";

export interface PaletteCardParams {
  colors: Array<string>;
  isOwn: boolean;
  isSaved? : boolean;
}

export default function PaletteCard({ colors, isOwn, isSaved }: PaletteCardParams) {
  

  return (
    <Box w="300px" h="200px" borderRadius="xl" border="1px" overflow="hidden">
      <ColorPalette colors={colors} height="calc(100% - 36px)" fontSize="xs" />
      <Divider />
      <PaletteFooter height = "35px" isOwn = {isOwn} isSaved={isSaved}/>
    </Box>
  );
}
