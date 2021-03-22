import * as React from "react";
import { Box } from "@chakra-ui/react";
import ProfilHeader from "../components/profile/ProfileHeader";
import PaletteLibrary from "../components/profile/PaletteLibrary";
import { ColorPalette, User } from "../App"

export interface ProfileParams{
  user: User;
  madePalettes : Array<ColorPalette>;
  savedPalettes :  Array<ColorPalette>;
}

export default function ProfilePage({user, madePalettes, savedPalettes} : ProfileParams){
    return (
      <Box w="100%" h = "calc(100% - 56px)" overflowY = "auto">
        <ProfilHeader name = {user.name}/>
        <PaletteLibrary madePalettes={madePalettes} savedPalettes={savedPalettes}/>
      </Box>
    );
}
