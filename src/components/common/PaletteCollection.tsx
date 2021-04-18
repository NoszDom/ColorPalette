import * as React from "react";
import { Wrap, WrapItem, Box, Divider } from "@chakra-ui/react";
import PaletteCard from "./PaletteCard";
import { ColorPalette } from "../../models/ColorPalette";
import { Option } from "../../models/Option";
import PaletteSorter from "./PaletteSorter";

export interface PaletteCollectionParams {
  userId: number;
  routeBase: string;
  paletteArray: Array<ColorPalette>;
  setPaletteArray: React.Dispatch<React.SetStateAction<Array<ColorPalette>>>;
  orderOptions: Array<Option>;
  sortOptions: Array<Option>;
}

export default function PaletteCollection({
  userId,
  routeBase,
  paletteArray,
  setPaletteArray,
  orderOptions,
  sortOptions,
}: PaletteCollectionParams) {
  return (
    <Box w="100%" h="100%">
      <PaletteSorter
        routeBase={routeBase}
        setPalettes={setPaletteArray}
        orderOptions={orderOptions}
        sortOptions={sortOptions}
      ></PaletteSorter>
      <Divider/>
      <Wrap spacing="30px" justify="center" p={7}>
        {paletteArray.map((palette: ColorPalette, index: number) => {
          return (
            <WrapItem key={index}>
              <PaletteCard palette={palette} userId={userId} />
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
}
