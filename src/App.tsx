import * as React from "react";
import {
  ChakraProvider,
  theme,
  Divider,
  Center,
  Spinner,
} from "@chakra-ui/react";
import GeneratorPage from "./pages/GeneratorPage";
import ProfilePage from "./pages/ProfilePage";
import BrowsePage from "./pages/BrowsePage";
import SavedPage from "./pages/SavedPage";
import OwnPage from "./pages/OwnPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/navbar/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { User } from "./models/User";
import { targetApiUrl } from "./network/Config";

export default function App() {
  const [currentUser, setCurrentUser] = React.useState<User>({
    id: -1,
    name: "",
    email: "",
  });

  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!loggedIn) {
      logIn({
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        setUser: setCurrentUser,
      });
    }
  }, [loggedIn]);

  if (!loggedIn) {
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
          <NavBar name={currentUser.name} columns={4} />
          <Divider />
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/generator">
              <GeneratorPage userId={currentUser.id} />
            </Route>
            <Route exact path="/browse">
              <BrowsePage userId={currentUser.id} />
            </Route>
            <Route exact path="/saved">
              <SavedPage userId={currentUser.id} />
            </Route>
            <Route exact path="/own">
              <OwnPage userId={currentUser.id} />
            </Route>
            <Route exact path="/myprofile">
              <ProfilePage user={currentUser} setUser={setCurrentUser} />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    );
  }
}

interface logInParams {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

async function logIn({ loggedIn, setLoggedIn, setUser }: logInParams) {
  if (!loggedIn) {
    axios.get(targetApiUrl + "/users/8").then((response) => {
      setUser(response.data);
      setLoggedIn(true);
    });
  }
}
