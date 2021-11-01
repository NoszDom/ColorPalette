import * as React from "react";
import "../../styles.css";
import {
  IconButton,
  Text,
  Popover,
  PopoverBody,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  HStack,
  PopoverHeader,
  Flex,
  Spacer,
  Input,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
} from "@chakra-ui/react";
import { CgColorPicker } from "react-icons/cg";
import hexRgb from "hex-rgb";
import rgbHex from "rgb-hex";
import hexColorRegex from "hex-color-regex";
import { HexColorPicker } from "react-colorful";

export interface ColorPickerParams {
  textColor: string;
  colors: Array<string>;
  setColors?: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
}

export default function ColorPickerPopUp({
  textColor,
  colors,
  setColors,
  index,
}: ColorPickerParams) {
  const [rgb, setRgb] = React.useState<Array<number>>(
    hexRgb(colors[index], { format: "array" })
  );
  const [hex, setHex] = React.useState<string>(colors[index]);
  const [inputHex, setInputHex] = React.useState<string>(colors[index]);

  React.useEffect(() => {
    setHex(colors[index]);
    setInputHex(colors[index]);
    setRgb(hexRgb(colors[index], { format: "array" }));
    console.log("haho");
  }, [colors, index]);

  function hexChanged(value: string) {
    setHex(value);
    setInputHex(value);
    setRgb(hexRgb(value, { format: "array" }));
    let tmp = colors;
    tmp[index] = value;
    setColors!(tmp);
  }

  function inputHexChanged(input: string) {
    setInputHex(input);
    if (
      (input.length === 4 || input.length === 7) &&
      hexColorRegex({ strict: true }).test(input)
    )
      hexChanged(input);
  }

  function rgbChanged(value: number, ix: number) {
    if (isNaN(value)) value = 0;
    if (value < 0 || value > 255) return;
    let tmp = rgb;
    tmp[ix] = value;
    setRgb(tmp);
    const inHex = "#" + rgbHex(tmp[0], tmp[1], tmp[2]);
    setHex(inHex);
    setInputHex(inHex);
    let cTmp = colors;
    cTmp[index] = inHex;
    setColors!(cTmp);
  }

  return (
    <Popover>
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
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Pick a color!</PopoverHeader>
        <PopoverBody pr="20px" pl="20px">
          <Stack>
            <div className="custom-colorful">
              <HexColorPicker
                color={hex}
                onChange={hexChanged}
              ></HexColorPicker>
            </div>

            <HStack spacing={6}>
              <Text fontWeight="bold">HEX:</Text>
              <Input
                w="81px"
                size="sm"
                maxLength={7}
                value={inputHex}
                onChange={(e) => inputHexChanged(e.target.value)}
              />
            </HStack>

            <HStack spacing={6}>
              <Text fontWeight="bold">RGB:</Text>
              <HStack spacing={3}>
                <NumberInput
                  size="sm"
                  maxW={12}
                  min={0}
                  max={255}
                  value={rgb[0]}
                  onChange={(_, value) => rgbChanged(value, 0)}
                >
                  <NumberInputField />
                </NumberInput>
                <NumberInput
                  size="sm"
                  maxW={12}
                  min={0}
                  max={255}
                  value={rgb[1]}
                  onChange={(_, value) => rgbChanged(value, 1)}
                >
                  <NumberInputField />
                </NumberInput>
                <NumberInput
                  size="sm"
                  maxW={12}
                  min={0}
                  max={255}
                  value={rgb[2]}
                  onChange={(_, value) => rgbChanged(value, 2)}
                >
                  <NumberInputField />
                </NumberInput>
              </HStack>
            </HStack>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
