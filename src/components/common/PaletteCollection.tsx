import * as React from "react";
import { Wrap, WrapItem, Box, Divider } from "@chakra-ui/react";
import PaletteCard from "./PaletteCard";
import { ColorPalette } from "../../models/ColorPalette";
import { Option } from "../../models/Option";
import PaletteSorter from "./PaletteSorter";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getPalettes } from "../../network/common-requests";

export interface PaletteCollectionParams {
  userId?: number;
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
  const [refreshPalettes, setRefreshPalettes] = useState<boolean>(false);

  const { isLoading, error, refetch } = useQuery(
    "repoData",
    () =>
      getPalettes({
        route: routeBase,
        setPalettes: setPaletteArray,
      }),
    { refetchOnWindowFocus: false, enabled: false }
  );

  useEffect(() => {
    if (refreshPalettes) refetch();
  }, [refreshPalettes, refetch]);

  return (
    <Box w="100%" h="100%">
      <PaletteSorter
        routeBase={routeBase}
        setPalettes={setPaletteArray}
        orderOptions={orderOptions}
        sortOptions={sortOptions}
      ></PaletteSorter>
      <Divider />
      <Wrap spacing="30px" justify="center" p={7}>
        {paletteArray.map((palette: ColorPalette, index: number) => {
          return (
            <WrapItem key={index}>
              <PaletteCard
                setRefreshPalettes={setRefreshPalettes}
                palette={palette}
                userId={userId}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
}
