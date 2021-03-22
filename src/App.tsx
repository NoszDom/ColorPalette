import * as React from "react";
import {
  ChakraProvider,
  theme,
  Divider,
  Center,
  Spinner
} from "@chakra-ui/react";
import GeneratorPage from "./pages/GeneratorPage";
import ProfilePage from "./pages/ProfilePage";
import BrowsePage from "./pages/BrowsePage";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

export interface User {
  id: number;
  name: string;
};

export interface ColorPalette {
  id: number;
  name: string;
  colors: Array<string>;
  creatorID: number;
  saves?: number;
  savedByCurrentUser?: boolean;
};


const testColors: Array<string> = [
  "#ffffff",
  "#000000",
  "#ff0000",
  "#0000ff",
  "#00ff00",
];

const dummyPalette1 : ColorPalette = {
  id :  1,
  name : "string",
  colors : testColors,
  creatorID : 0,
  saves : 12,
}

const dummyPalette2 : ColorPalette = {
  id :  2,
  name : "ez másé",
  colors : testColors,
  creatorID :  1,
  saves : 120,
  savedByCurrentUser : true
}

const dummyPalette3 : ColorPalette = {
  id :  3,
  name :"ez nincs mentve",
  colors : testColors,
  creatorID : 1,
  saves :1234,
  savedByCurrentUser : false
}

export default function App() {
  const [colorPalettes, setColorPalettes] = React.useState<
    Array<ColorPalette>
  >([dummyPalette1, dummyPalette2, dummyPalette3]);
  const [currentUser, setCurrentUser] = React.useState<User>({
    id: 0,
    name: "Some One",
  });

  const sortedPalettes : Array<Array<ColorPalette>> = sortOwn(colorPalettes, currentUser.id);

  if (false ) {
    return (
      <ChakraProvider theme={theme}>
        <Center w="100%" h="100%">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  } else {
    return (
      <ChakraProvider theme={theme}>
        <Router>
          <NavBar name={currentUser.name} columns={2} />
          <Divider />
          <Switch>
            <Route exact path="/">
              <BrowsePage palettes = { sortedPalettes[1].concat(sortedPalettes[2]) } userID = {currentUser.id}/>
            </Route>
            <Route path="/generator">
              <GeneratorPage/>
            </Route>
            <Route path="/myprofile">
              <ProfilePage name = {currentUser.name} madePalettes = {sortedPalettes[0]} savedPalettes = {sortedPalettes[1]}/>
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    );
  }
}

function sortOwn(array : Array<ColorPalette>, id: number){
  const own = Array<ColorPalette>()
  const saved = Array<ColorPalette>()
  const notSaved = Array<ColorPalette>()

  array.map((palette) =>{
    if(palette.creatorID === id){
      own.push(palette);
    }
    else{
      if (palette.savedByCurrentUser){
        saved.push(palette);
      }
      else{
        notSaved.push(palette);
      }
    }
  });

  return [own, saved, notSaved];
}

/*async function loadPage() {
  if (loading === 0){
  setLoading(1)
  var callCount: number = 0;

  callCount++;
  Axios.get("https://localhost:44330/api/users/6").then((response) => {
    callCount--;
    setCurrentUser(response.data);
    if (callCount === 0) setLoading(2);
    console.log(currentUser);
  });

  callCount++;
  Axios.get("https://localhost:44330/api/colorpalettes").then((response) => {
    callCount--;
    if (callCount === 0) setLoading(2);
    response.data.map((palette : ColorPalette) =>
      setColorPalettes([...colorPalettes, palette])
    );
    console.log(colorPalettes);
  });

  callCount++;
  Axios.get("https://localhost:44330/api/saves").then((response) => {
    callCount--;
    if (callCount === 0) setLoading(false);
    //console.log(response.data);
  });
}
}*/