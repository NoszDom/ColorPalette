import * as React from "react";
import { Button, HStack, Select } from "@chakra-ui/react";
import randomColor from "randomcolor";
import hexRgb from "hex-rgb";
import rgbHex from "rgb-hex";

export interface GeneratorParams {
  colors: Array<string>;
  setColors: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function ToolBar({ colors, setColors }: GeneratorParams) {
  const [currentMethod, setCurrentMethod] = React.useState<string>("random");

  function handleClick() {
    var result = Array<string>();
    if (currentMethod === "random") result = generateRandom();
    if (currentMethod === "monochrome") result = generateMonochrome();
    if (currentMethod === "complementary") result = generateComplementary();
    setColors(result);
  }

  return (
    <HStack>
      <Select
        variant="filled"
        defaultValue="random"
        onChange={(e) => setCurrentMethod(e.target.value)}
      >
        <option value="random">Random</option>
        <option value="monochrome">Monochrome</option>
        <option value="complementary">Complementary</option>
      </Select>

      <Button colorScheme="purple" w="130px" onClick={() => handleClick()}>
        Generate!
      </Button>
    </HStack>
  );
}

export function generateRandom() {
  return randomColor({ hue: "random", luminosity: "random", count: 5 });
}

const hueOption = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
];

// jelenleg a randomcolor által generált színnel crashel, ezért a konstans hue-k közül választok egyet
function generateMonochrome() {
  const randomHue = hueOption[Math.floor(Math.random() * hueOption.length)];
  return randomColor({ hue: randomHue, count: 5 });
}

function generateComplementary() {
  const randomHue = hueOption[Math.floor(Math.random() * hueOption.length)];
  const colors = randomColor({ hue: randomHue, count: 3 });
  colors.push(getComplementaryColor(colors[0]));
  colors.push(getComplementaryColor(colors[1]));
  return colors;
}

function getComplementaryColor(hex: string): string {
  let rgb = hexRgb(hex, { format: "array" });
  rgb[0] = 255 - rgb[0];
  rgb[1] = 255 - rgb[1];
  rgb[2] = 255 - rgb[2];
  return "#" + rgbHex(rgb[0], rgb[1], rgb[2]);
}
