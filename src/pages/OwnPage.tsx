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
    { text: "Newest", value: "new" },
    { text: "Oldest", value: "old" },
  ];

  const sortOptions: Array<Option> = [{ text: "Palette name", value: "name" }];

  const toast = useToast();

  const { isLoading, error } = useQuery("ownPalettes", () =>
    getPalettes({
      route: "/colorpalettes/" + userId + "?creator=" + userId,
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
          routeBase={"/colorpalettes/" + userId + "?creator=" + userId + "&"}
          paletteArray={palettes}
          setPaletteArray={setPalettes}
          setParams={setParams}
          params={params}
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
