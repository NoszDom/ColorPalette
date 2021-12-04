import * as React from "react";
import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
import PaletteCollection from "../components/common/PaletteCollection";
import { ColorPalette } from "../models/ColorPalette";
import { Option } from "../models/Option";
import { getPalettes } from "../network/common-requests";
import { useQuery } from "react-query";

export interface BrowseParams {
  userId?: number;
}

export default function BrowsePage({ userId }: BrowseParams) {
  const [palettes, setPalettes] = React.useState<Array<ColorPalette>>(
    Array<ColorPalette>()
  );

  const [params, setParams] = React.useState<Object>({});

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
  const route =
    userId === undefined ? "/colorpalettes?" : "/colorpalettes/" + userId + "?";
  const toast = useToast();

  const { isLoading, error } = useQuery("browsePagePalettes", () =>
    getPalettes({
      route: route,
      setPalettes: setPalettes,
      params: params,
    })
  );

  if (error) {
    toast({
      status: "error",
      title: "Cannot get palettes",
      isClosable: true,
    });
  }

  if (!isLoading) {
    return (
      <Box w="100%" h="calc(100% - 56px)" overflowY="auto" overflowX="hidden">
        <PaletteCollection
          routeBase={route}
          paletteArray={palettes}
          setPaletteArray={setPalettes}
          userId={userId}
          orderOptions={orderOptions}
          sortOptions={sortOptions}
          setParams={setParams}
          params={params}
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
