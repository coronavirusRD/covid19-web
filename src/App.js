import "./App.scss";
import React, { lazy, Suspense } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Route, Switch } from "react-router-dom";
import {
  CssBaseline,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import CircularLoader from "./components/CircularLoader";

const Home = lazy(() => import("./views/Home"));

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#12454d",
    },
    text: {
      primary: "#21262e",
    },
  },
  typography: {
    fontFamily: ["Lato", "Comfortaa"],
  },
});

const client = new ApolloClient({
  uri: "https://covid19-graphql.now.sh/",
});

theme = responsiveFontSizes(theme);

const App = () => {
  return (
    <div className="covid19">
      <ApolloProvider client={client}>
        <Suspense fallback={<CircularLoader />}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <div className="covid19-content">
              <Switch>
                <Route path="/:date?" component={Home}/>
              </Switch>
            </div>
            <Footer />
          </ThemeProvider>
        </Suspense>
      </ApolloProvider>
    </div>
  );
};

export default App;
