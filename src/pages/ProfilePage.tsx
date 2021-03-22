import * as React from "react";
import { Box } from "@chakra-ui/react";
import ProfilHeader from "../components/profile/ProfileHeader";
import PaletteLibrary from "../components/profile/PaletteLibrary";
import { ColorPalette, User } from "../App"

export interface ProfileParams{
  name : string;
  madePalettes : Array<ColorPalette>;
  savedPalettes :  Array<ColorPalette>;
}

export default function ProfilePage({name, madePalettes, savedPalettes} : ProfileParams){
    return (
      <Box w="100%" h = "calc(100% - 56px)" overflowY = "auto">
        <ProfilHeader name = {name}/>
        <PaletteLibrary madePalettes={madePalettes} savedPalettes={savedPalettes}/>
      </Box>
    );
}
