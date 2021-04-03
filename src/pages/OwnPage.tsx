import * as React from "react";
import { Box } from "@chakra-ui/react";
import PaletteCollection from "../components/common/PaletteCollection"
import { ColorPalette } from "../App"

export interface BrowseParams{
  palettes : Array<ColorPalette>;
  userID : number;
}

export default function BrowsePage( {palettes, userID} : BrowseParams ){
    return (
      <Box w="100%" h = "calc(100% - 56px)" overflowY = "auto" overflowX="hidden" p={7}>
          <PaletteCollection paletteArray ={palettes}/>
      </Box>
    );
  }
