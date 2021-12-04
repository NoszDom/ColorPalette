import * as React from "react";
import {
  Button,
  Text,
  Select,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ColorPalette } from "../../models/ColorPalette";
import { Option } from "../../models/Option";
import { getPalettes } from "../../network/common-requests";
import { useQuery } from "react-query";

export interface PaletteSorterParams {
  routeBase: string;
  orderOptions: Array<Option>;
  sortOptions: Array<Option>;
  setPalettes: React.Dispatch<React.SetStateAction<Array<ColorPalette>>>;
  setParams: React.Dispatch<React.SetStateAction<Object>>;
}

export default function PaletteSorter({
  routeBase,
  orderOptions,
  sortOptions,
  setPalettes,
  setParams,
}: PaletteSorterParams) {
  const [order, setOrder] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<string>("");
  const [sortValue, setSortValue] = React.useState<string>("");
  const [inputType, setInputType] = React.useState<string>("text");

  const toast = useToast();
  let route = routeBase;

  const { isLoading, isFetching, error, refetch } = useQuery(
    "sortPalettes",
    () => {
      setParams({ order, sortBy, sortValue });
      getPalettes({
        route: route,
        setPalettes: setPalettes,
        params: { order, sortBy, sortValue },
      });
    },
    { refetchOnWindowFocus: false, enabled: false }
  );

  if (error) {
    toast({
      status: "error",
      title: "Cannot get palettes",
      isClosable: true,
    });
  }

  return (
    <HStack h="55px" fontSize="l" ml={5} mr={5} spacing={2}>
      <Text fontWeight="bold">Order by:</Text>
      <Select
        variant="filled"
        defaultValue=""
        onChange={(e) => setOrder(e.target.value)}
        w="200px"
      >
        <option value="">Default</option>
        {orderOptions.map((option, index) => {
          return (
            <option value={option.value} key={index}>
              {option.text}
            </option>
          );
        })}
      </Select>
      <Text fontWeight="bold" pl={5}>
        Filter by:
      </Text>
      <Select
        variant="filled"
        defaultValue=""
        onChange={(e) => {
          setSortValue("");
          e.target.value.includes("saves")
            ? setInputType("number")
            : setInputType("text");
          setSortBy(e.target.value);
        }}
        w="170px"
      >
        <option value="">Default</option>
        {sortOptions.map((option, index) => {
          return (
            <option value={option.value} key={index}>
              {option.text}
            </option>
          );
        })}
      </Select>
      <Input
        placeholder="Filter value"
        w="170px"
        type={inputType}
        value={sortValue}
        onChange={(e) => setSortValue(e.target.value)}
        disabled={sortBy === ""}
      />
      <Button
        colorScheme="purple"
        isLoading={isLoading || isFetching}
        onClick={() => refetch()}
      >
        Apply
      </Button>
    </HStack>
  );
}
