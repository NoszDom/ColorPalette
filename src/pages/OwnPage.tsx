import * as React from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import PaletteCollection from "../components/common/PaletteCollection";
import { ColorPalette, JsonPalette } from "../models/ColorPalette";
import axios from "axios";
import { targetApiUrl } from "../network/Config";

export interface BrowseParams {
  userId: number;
}

export default function BrowsePage({ userId }: BrowseParams) {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [palettes, setPalettes] = React.useState<Array<ColorPalette>>(
    Array<ColorPalette>()
  );

  React.useEffect(() => {
    getPalettes({
      loaded: loaded,
      setLoaded: setLoaded,
      palettes: palettes,
      setPalettes: setPalettes,
      userId: userId,
    });
  }, [loaded]);

  if (loaded) {
    return (
      <Box
        w="100%"
        h="calc(100% - 56px)"
        overflowY="auto"
        overflowX="hidden"
        p={7}
      >
        <PaletteCollection paletteArray={palettes} userId={userId} />
      </Box>
    );
  } else {
    return (
      <Center w="100%" h="calc(100% - 56px)">
        <Spinner size="xl" />
      </Center>
    );
  }
}

interface getPalettesParams {
  loaded: boolean;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  palettes: Array<ColorPalette>;
  setPalettes: React.Dispatch<React.SetStateAction<Array<ColorPalette>>>;
  userId: number;
}

async function getPalettes({
  loaded,
  setLoaded,
  palettes,
  setPalettes,
  userId,
}: getPalettesParams) {
  if (!loaded) {
    axios
      .get(targetApiUrl + "/colorpalettes/" + userId + "?creator=" + userId)
      .then((response) => {
        response.data.map((value: JsonPalette) => {
          console.log(value.colors);
          var palette = {
            id: value.id,
            name: value.name,
            creatorId: value.creatorId,
            creatorName: value.creatorName,
            saves: value.saves,
            savedByCurrentUser: value.savedByCurrentUser,
            colors: JSON.parse(value.colors),
          };
          setPalettes((palettes) => [...palettes, palette]);
        });
        setLoaded(true);
      });
  }
}
