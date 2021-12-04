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
  Input,
  NumberInput,
  NumberInputField,
  Box,
} from "@chakra-ui/react";
import { CgColorPicker } from "react-icons/cg";
import convert from "color-convert";
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
    convert.hex.rgb(colors[index])
  );
  const [hex, setHex] = React.useState<string>(colors[index]);
  const [inputHex, setInputHex] = React.useState<string>(colors[index]);

  React.useEffect(() => {
    setHex(colors[index]);
    setInputHex(colors[index]);
    setRgb(convert.hex.rgb(colors[index]));
  }, [colors, index]);

  function hexChanged(value: string) {
    value = value.toUpperCase();
    setHex(value);
    setInputHex(value);
    setRgb(convert.hex.rgb(value));
    let tmp = colors;
    tmp[index] = value;
    setColors!(tmp);
  }

  function inputHexChanged(input: string) {
    setInputHex(input);
    if (input.length === 7 && hexColorRegex({ strict: true }).test(input))
      hexChanged(input);
  }

  function rgbChanged(value: number, ix: number) {
    if (isNaN(value)) value = 0;
    if (value < 0 || value > 255) return;
    let tmp = rgb;
    tmp[ix] = value;
    setRgb(tmp);
    const inHex = "#" + convert.rgb.hex(tmp[0], tmp[1], tmp[2]);
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
          isRound={true}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Pick a color!</PopoverHeader>
        <PopoverBody pr="20px" pl="20px">
          <Stack>
            <Box className="custom-colorful">
              <HexColorPicker
                color={hex}
                onChange={hexChanged}
              ></HexColorPicker>
            </Box>

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
                {rgb.map((_, index) => {
                  return (
                    <NumberInput
                      size="sm"
                      maxW={12}
                      min={0}
                      max={255}
                      value={rgb[index]}
                      onChange={(_, value) => rgbChanged(value, index)}
                    >
                      <NumberInputField />
                    </NumberInput>
                  );
                })}
              </HStack>
            </HStack>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
