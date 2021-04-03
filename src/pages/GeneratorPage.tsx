import * as React from "react";
import { Box } from "@chakra-ui/react";
import ToolBar from "../components/toolbar/ToolBar";
import ColorPalette from "../components/common/ColorPalette";

export default function GeneratorPage() {

  const [colors, setColors] = React.useState<Array<string>>(["#000000", "#ffffff","#ff0000", "#00ff00","#0000ff"]);

  return (
    <Box h = "calc(100% - 56px)" w="100%">
      <ToolBar />
      <ColorPalette
        colors={colors}
        height="calc(100% - 55px)"
        fontSize="xl"
        editable={true}
        setColors={setColors}
      />
    </Box>
  );
}
