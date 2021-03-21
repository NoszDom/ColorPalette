import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
} from "@chakra-ui/react";
import PaletteCollection from "../common/PaletteCollection"

export interface PaletteLibraryParams {
  madePalettes: Array<Array<string>>;
  savedPalettes: Array<Array<string>>;
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
              <PaletteCollection paletteArray={madePalettes} isOwn = {true}/>
          </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
          <AccordionButton justifyContent="center">
            <Heading size="md">Saved by User</Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <PaletteCollection paletteArray={savedPalettes} isOwn = {false} isSaved = {true}/>
          </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
