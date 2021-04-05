import * as React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import PaletteCard from "./PaletteCard";
import { ColorPalette } from "../../App"


export interface PaletteCollectionParams {
  paletteArray: Array<ColorPalette>;
  userId: number;
}

export default function PaletteCollection({ paletteArray, userId }: PaletteCollectionParams) {
  return (
    <Wrap spacing="30px" justify="center">
      {paletteArray.map((palette: ColorPalette, index : number) => {
        return (
          <WrapItem key = {index}>
            <PaletteCard palette={palette} userId = {userId}/>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
