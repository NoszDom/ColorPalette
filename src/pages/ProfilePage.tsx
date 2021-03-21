import * as React from "react";
import { Box } from "@chakra-ui/react";
import ProfilHeader from "../components/profile/ProfileHeader";
import PaletteLibrary from "../components/profile/PaletteLibrary";

const testColors: Array<string> = [
  "#000000",
  "#ff0000",
  "#0000ff",
  "#00ff00",
  "#f0f000",
];

const test : Array<Array<string>> = [testColors, testColors, testColors]

export default function ProfilePage(){
    return (
      <Box w="100%" h = "calc(100% - 56px)" overflowY = "auto">
        <ProfilHeader name = "Lorem Ipsum"/>
        <PaletteLibrary madePalettes={test} savedPalettes={test}/>
      </Box>
    );
  }
