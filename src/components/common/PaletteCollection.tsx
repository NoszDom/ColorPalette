import * as React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import PaletteCard from "./PaletteCard";
import { ColorPalette } from "../../App"


export interface PaletteCollectionParams {
  paletteArray: Array<ColorPalette>;
}

export default function PaletteCollection({ paletteArray }: PaletteCollectionParams) {
  return (
    <Wrap spacing="30px" justify="center">
      {paletteArray.map((palette: ColorPalette, index : number) => {
        return (
          <WrapItem key = {index}>
            <PaletteCard palette={palette}/>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
