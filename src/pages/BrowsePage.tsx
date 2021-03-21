import * as React from "react";
import { Box } from "@chakra-ui/react";
import PaletteCollection from "../components/common/PaletteCollection"

const testColors: Array<string> = [
  "#000000",
  "#ff0000",
  "#0000ff",
  "#00ff00",
  "#f0f000",
];

const test : Array<Array<string>> = [testColors, testColors, testColors, testColors, testColors, testColors, testColors, testColors, testColors]

export default function BrowsePage(){
    return (
      <Box w="100%" h = "calc(100% - 56px)" overflowY = "auto" overflowX="hidden" p={7}>
          <PaletteCollection isOwn={false} isSaved={false} paletteArray={test}/>
      </Box>
    );
  }
