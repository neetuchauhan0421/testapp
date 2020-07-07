/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Main Index file
 */

import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./App";

// Importing Gobal CSS file
import "./resources/css/style.css";

// Global theme
const theme = createMuiTheme({
  palette: {
    primary: { main: "#e36e39" },
    secondary: { main: "#2196f3" }
  },
  typography: { useNextVariants: true }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
