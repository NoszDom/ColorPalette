import * as React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import PaletteCard from "./PaletteCard";

export interface PaletteCollectionParams {
  paletteArray: Array<Array<string>>;
  isOwn: boolean;
  isSaved? : boolean;
}

export default function PaletteCollection({
  isOwn,
  isSaved,
  paletteArray,
}: PaletteCollectionParams) {
  return (
    <Wrap spacing="30px" justify="center">
      {paletteArray.map((subArray: Array<string>) => {
        return (
          <WrapItem>
            <PaletteCard colors={subArray} isOwn={isOwn} isSaved = {isSaved}/>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
