import React from "react";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";

const primary = "#001aff";
const secondary = "#ffff00";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: secondary,
    },
    secondary: {
      main: secondary,
    },
  },
  spacing: 8,
});

export default function App(props) {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Route path="/" exact component={Home} />
          <Route path="/settings/" component={Settings} />
        </ThemeProvider>
      </MuiThemeProvider>
    </Router>
  );
}
