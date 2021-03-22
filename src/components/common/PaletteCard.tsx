import * as React from "react";
import { Box, Divider } from "@chakra-ui/react";
import ColorPalette from "./ColorPalette";
import PaletteFooter from "./PaletteFooter";
import { ColorPalette as Palette } from "../../App";

export interface PaletteCardParams {
  palette: Palette;
}

export default function PaletteCard({ palette }: PaletteCardParams) {
  return (
    <Box w="300px" h="200px" borderRadius="xl" border="1px" overflow="hidden">
      <ColorPalette
        colors={palette.colors}
        height="calc(100% - 36px)"
        fontSize="xs"
      />
      <Divider />
      <PaletteFooter
        height="35px"
        isOwn={palette.creatorID === 0}
        isSaved={palette.savedByCurrentUser}
        title={palette.name}
        saves={palette.saves}
        creatorID={palette.creatorID}
      />
    </Box>
  );
}
