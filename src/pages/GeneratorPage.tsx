import * as React from "react";
import { Box } from "@chakra-ui/react";
import ToolBar from "../components/toolbar/ToolBar";
import ColorPalette from "../components/common/ColorPalette";

const testColors: Array<string> = [
  "#ffffff",
  "#000000",
  "#ff0000",
  "#0000ff",
  "#00ff00",
];

export default function GeneratorPage() {
  return (
    <Box h = "calc(100% - 56px)" w="100%">
      <ToolBar />
      <ColorPalette
        colors={testColors}
        height="calc(100% - 55px)"
        fontSize="xl"
      />
    </Box>
  );
}
