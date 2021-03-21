import * as React from "react";
import { ChakraProvider, theme, Divider } from "@chakra-ui/react";
import GeneratorPage from "./pages/GeneratorPage";
import ProfilePage from "./pages/ProfilePage";
import BrowsePage from "./pages/BrowsePage"
import NavBar from "./components/navbar/NavBar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar name="Lorem Ipsum" columns={2} />
    <Divider/>
    <BrowsePage/>
  </ChakraProvider>
);
