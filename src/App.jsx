import React from "react";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#001aff",
      // contrastText: 'yellow',
    },
    secondary: {
      main: "#FFFF00",
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
