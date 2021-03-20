import * as React from "react";
import { ChakraProvider, Divider, theme } from "@chakra-ui/react";
import NavBar from "../components/navbar/NavBar";
import ToolBar from "../components/toolbar/ToolBar";
import ColorPalette from "../components/colorpalette/ColorPalette";

const testColors : Array<string> = ["#ffffff", "#000000", "#ff0000", "#0000ff", "#00ff00"];

export const GeneratorPage = () => (

  <ChakraProvider theme={theme}>
    <NavBar name="Lorem Ipsum" columns={2} />
    <Divider />
    <ToolBar />
    <ColorPalette colors={testColors} height="calc(100% - 111px)"/>
  </ChakraProvider>
);
