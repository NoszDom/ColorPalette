import * as React from "react";
import { Divider, Center, Spinner } from "@chakra-ui/react";
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
import { User } from "./models/User";
import load from "./storage/Load";

export default function App() {
  const [currentUser, setCurrentUser] = React.useState<User>({
    id: -1,
    name: "",
    email: "",
  });

  const [token, setToken] = React.useState<string>("");

  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!loggedIn) {
      load({
        setLoggedIn: setLoggedIn,
        setUser: setCurrentUser,
        setToken: setToken,
      });
      setLoaded(true);
    }
  }, [loggedIn]);

  if (loggedIn && loaded) {
    return (
      <Router>
        <NavBar name={currentUser.name} columns={4} />
        <Divider />
        <Switch>
          <Route exact path="/">
            <Redirect to="/generator" />
          </Route>
          <Route exact path="/login">
            <Redirect to="/generator" />
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
            <ProfilePage
              user={currentUser}
              setUser={setCurrentUser}
              setLoggedIn={setLoggedIn}
            />
          </Route>
        </Switch>
      </Router>
    );
  } else if (loaded) {
    return (
      <Router>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <LoginPage
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setUser={setCurrentUser}
            setToken={setToken}
          />
        </Route>
      </Router>
    );
  } else {
    return (
      <Center w="100%" h="100%">
        <Spinner />
      </Center>
    );
  }
}
