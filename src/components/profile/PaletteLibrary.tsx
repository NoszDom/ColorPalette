import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
} from "@chakra-ui/react";
import PaletteCollection from "../common/PaletteCollection";
import { ColorPalette } from "../../App"

export interface PaletteLibraryParams {
  madePalettes: Array<ColorPalette>;
  savedPalettes: Array<ColorPalette>;
}

export default function PaletteLibrary({madePalettes, savedPalettes} : PaletteLibraryParams) {

  return (
    <Accordion allowMultiple defaultIndex={[0,1]}>
      <AccordionItem>
          <AccordionButton justifyContent="center">
            <Heading size="md">Made by User</Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel mt={2} mb={2}>
              <PaletteCollection paletteArray={madePalettes}/>
          </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
          <AccordionButton justifyContent="center">
            <Heading size="md">Saved by User</Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <PaletteCollection paletteArray={savedPalettes}/>
          </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
