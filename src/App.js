import "./App.scss";
import React from "react";
import {
  CssBaseline,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import Home from "./views/Home";

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

theme = responsiveFontSizes(theme);

const App = () => {
  return (
    <div className="covid19">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <div className="covid19-content">
          <Home />
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
