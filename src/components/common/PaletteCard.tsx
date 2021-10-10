import * as React from "react";
import { Box, Divider } from "@chakra-ui/react";
import ColorPalette from "./ColorPalette";
import PaletteFooter from "./PaletteFooter";
import { ColorPalette as Palette } from "../../models/ColorPalette";

export interface PaletteCardParams {
  palette: Palette;
  userId?: number;
  setRefreshPalettes: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PaletteCard({
  palette,
  userId,
  setRefreshPalettes,
}: PaletteCardParams) {
  return (
    <Box w="300px" h="200px" borderRadius="xl" border="1px" overflow="hidden">
      <ColorPalette
        colors={palette.colors}
        height="calc(100% - 36px)"
        fontSize="xs"
      />
      <Divider />
      <PaletteFooter
        setRefreshPalettes={setRefreshPalettes}
        height="35px"
        userId={userId}
        palette={palette}
      />
    </Box>
  );
}
