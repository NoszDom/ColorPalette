import * as React from "react";
import {
  ChakraProvider,
  Divider,
  theme,
} from "@chakra-ui/react";
import NavBar from "./components/navbar/NavBar";
import ToolBar from "./components/toolbar/ToolBar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar name = "Lorem Ipsum" columns = {2}/>
    <Divider/>
    <ToolBar/>
  </ChakraProvider>
);
