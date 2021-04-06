import * as React from "react";
import { Button, HStack, Select } from "@chakra-ui/react";
import randomColor from "randomcolor";

export interface GeneratorParams{
  colors: Array<string>;
  setColors: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function ToolBar({colors, setColors} : GeneratorParams) {
  const [currentMethod, setCurrentMethod] = React.useState<string>("random");

  function handleClick(){
    var result = Array<string>(); 
    if(currentMethod === "random") result = generateRandom();
    if (currentMethod === "monochrome") result = generateMonochrome();
    setColors(result);
  }

  return (
    <HStack>
      <Select variant="filled" defaultValue = "random" onChange={(e) => setCurrentMethod(e.target.value)}>
        <option value="random" >Random</option>
        <option value="monochrome">Monochrome</option>
      </Select>

      <Button colorScheme="purple" w="130px" onClick={() => handleClick()}>
        Generate!
      </Button>
    </HStack>
  );
}

function generateRandom(){
  return randomColor({hue: 'random',luminosity: 'random',count: 5});
}

function generateMonochrome(){
  var baseColor = randomColor({hue: 'random',luminosity: 'random'});
  return randomColor({hue: baseColor, count: 5});
}




