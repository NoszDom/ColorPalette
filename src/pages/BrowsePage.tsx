import * as React from "react";
import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
import PaletteCollection from "../components/common/PaletteCollection";
import { ColorPalette } from "../models/ColorPalette";
import { Option } from "../models/Option";
import { getPalettes } from "../network/Requests";
import { useEffect } from "react";

export interface BrowseParams {
  userId?: number;
}

export default function BrowsePage({ userId }: BrowseParams) {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [palettes, setPalettes] = React.useState<Array<ColorPalette>>(
    Array<ColorPalette>()
  );

  const orderOptions: Array<Option> = [
    { text: "Palette name A -> Z", value: "name" },
    { text: "Palette name Z -> A", value: "name-desc" },
    { text: "Creator name A -> Z", value: "creator" },
    { text: "Creator name Z -> A", value: "creator-desc" },
    { text: "Most popular", value: "most-saves" },
    { text: "Least popular", value: "least-saves" },
    { text: "Newest", value: "new" },
    { text: "Oldest", value: "old" },
  ];
  const sortOptions: Array<Option> = [
    { text: "Palette name", value: "name" },
    { text: "Creator name", value: "creator" },
    { text: "Minimum saves", value: "min-saves" },
    { text: "Maximum saves", value: "max-saves" },
  ];
  const url =
    userId === undefined ? "/colorpalettes?" : "/colorpalettes/" + userId + "?";
  const [error, setError] = React.useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    if (error === true) {
      toast({
        status: "error",
        title: "Cannot get palettes",
        isClosable: true,
      });
      setError(false);
    }
  }, [error, toast]);

  React.useEffect(() => {
    getPalettes({
      route: url,
      loaded: loaded,
      setLoaded: setLoaded,
      setPalettes: setPalettes,
      setError,
    });
  }, [loaded, url]);

  if (loaded) {
    return (
      <Box w="100%" h="calc(100% - 56px)" overflowY="auto" overflowX="hidden">
        <PaletteCollection
          routeBase={url}
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
