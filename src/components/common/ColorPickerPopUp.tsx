import * as React from "react";
import {
  IconButton,
  Box,
  Slider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Stack,
  HStack,
  PopoverHeader,
  Flex,
  Spacer,
  InputGroup,
  Input,
  InputLeftAddon,
} from "@chakra-ui/react";
import { CgColorPicker } from "react-icons/cg";

export interface ColorPickerParams {
  textColor: string;
  color: string;
}

export default function ColorPickerPopUp({
  textColor,
  color,
}: ColorPickerParams) {
  return (
    <Popover closeOnBlur={false}>
      <PopoverTrigger>
        <IconButton
          aria-label="Pick a color"
          size="md"
          color={textColor}
          fontSize="2xl"
          icon={<CgColorPicker />}
          variant="outline"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="bold">Pick a color!</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <Box padding="10px">
          <Stack>
            <Flex alignItems="center">
              <Text fontWeight="bold">Red</Text>
              <Spacer />
              <NumberInput min={0} max={255} size="sm">
                <NumberInputField width="75px" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Slider
              aria-label="slider-red"
              defaultValue={30}
              min={0}
              max={255}
              step={1}
            >
              <SliderTrack h="12px" bgGradient="linear(to-r, #000000, #ff0000)">
                <SliderFilledTrack bgColor="transparent" />
              </SliderTrack>
              <SliderThumb h="20px" w="20px" />
            </Slider>

            <Flex alignItems="center">
              <Text fontWeight="bold">Green</Text>
              <Spacer />
              <NumberInput min={0} max={255} size="sm">
                <NumberInputField width="75px" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Slider
              aria-label="slider-green"
              defaultValue={30}
              min={0}
              max={255}
              step={1}
            >
              <SliderTrack h="12px" bgGradient="linear(to-r, #000000, #00ff00)">
                <SliderFilledTrack bgColor="transparent" />
              </SliderTrack>
              <SliderThumb h="20px" w="20px" />
            </Slider>

            <Flex alignItems="center">
              <Text fontWeight="bold">Blue</Text>
              <Spacer />
              <NumberInput min={0} max={255} size="sm">
                <NumberInputField width="75px" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Slider
              aria-label="slider-blue"
              defaultValue={30}
              min={0}
              max={255}
              step={1}
            >
              <SliderTrack h="12px" bgGradient="linear(to-r, #000000, #0000ff)">
                <SliderFilledTrack bgColor="transparent" />
              </SliderTrack>
              <SliderThumb h="20px" w="20px" />
            </Slider>

            <HStack spacing={6}>
              <Text fontWeight="bold">HEX</Text>
              <InputGroup size="sm">
                <InputLeftAddon>#</InputLeftAddon>
                <Input w ="75px"/>
              </InputGroup>
            </HStack>

            <ButtonGroup display="flex" justifyContent="flex-end">
              <Button variant="ghost" colorScheme="purple">
                Cancel
              </Button>
              <Button colorScheme="purple">Ok</Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </PopoverContent>
    </Popover>
  );
}
