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
import { load } from "./services/storage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [currentUser, setCurrentUser] = React.useState<User>({
    id: undefined,
    name: undefined,
    email: undefined,
  });
  const [token, setToken] = React.useState<string>("");
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!loggedIn) {
      load(setLoggedIn, setCurrentUser, setToken);
      setLoaded(true);
    }
  }, [loggedIn]);

  if (loggedIn && loaded) {
    return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBar name={currentUser!.name} isLoggedIn={true} />
          <Divider />
          <Switch>
            <Route exact path="/login">
              <Redirect to="/generator" />
            </Route>
            <Route exact path="/generator">
              <GeneratorPage userId={currentUser!.id} />
            </Route>
            <Route exact path="/browse">
              <BrowsePage userId={currentUser!.id} />
            </Route>
            <Route exact path="/saved">
              <SavedPage userId={currentUser!.id} />
            </Route>
            <Route exact path="/own">
              <OwnPage userId={currentUser!.id} />
            </Route>
            <Route exact path="/myprofile">
              <ProfilePage
                user={currentUser!}
                setUser={setCurrentUser}
                setLoggedIn={setLoggedIn}
              />
            </Route>
            <Route path="/">
              <Redirect to="/generator" />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    );
  } else if (loaded) {
    return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBar isLoggedIn={false} />
          <Divider />
          <Switch>
            <Route exact path="/login">
              <LoginPage
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setUser={setCurrentUser}
                setToken={setToken}
              />
            </Route>
            <Route exact path="/generator">
              <GeneratorPage />
            </Route>
            <Route exact path="/browse">
              <BrowsePage />
            </Route>
            <Route path="/">
              <Redirect to="/generator" />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    );
  } else {
    return (
      <Center w="100%" h="100%">
        <Spinner />
      </Center>
    );
  }
}
