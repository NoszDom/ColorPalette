import * as React from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import PaletteCollection from "../components/common/PaletteCollection";
import { ColorPalette } from "../models/ColorPalette";
import { Option } from "../models/Option";
import { getPalettes } from "../network/Requests";

export interface BrowseParams {
  userId: number;
}

export default function BrowsePage({ userId }: BrowseParams) {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [palettes, setPalettes] = React.useState<Array<ColorPalette>>(
    Array<ColorPalette>()
  );

  const orderOptions: Array<Option> = [
    { text: "Palette name A -> Z", value: "name" },
    { text: "Palette name Z -> A", value: "name-desc" },
    { text: "Newest", value: "new" },
    { text: "Oldest", value: "old" },
  ];

  const sortOptions: Array<Option> = [{ text: "Palette name", value: "name" }];

  React.useEffect(() => {
    getPalettes({
      route: "/colorpalettes/" + userId + "?creator=" + userId,
      loaded: loaded,
      setLoaded: setLoaded,
      setPalettes: setPalettes,
    });
  }, [loaded]);

  if (loaded) {
    return (
      <Box w="100%" h="calc(100% - 56px)" overflowY="auto" overflowX="hidden">
        <PaletteCollection
          routeBase={"/colorpalettes/" + userId + "?creator=" + userId + "&"}
          paletteArray={palettes}
          setPaletteArray={setPalettes}
          userId={userId}
          orderOptions={orderOptions}
          sortOptions={sortOptions}
        />
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
