import React from "react";
import ReactDOM from "react-dom";
import {
  theme,
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
} from "@chakra-ui/core";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const customTheme = {
  ...theme,
  variantColors: [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
  ],
  light: {
    bg: theme.colors.gray[100],
    borderColor: theme.colors.gray[400],
    paletteNum: 500,
    inversePaletteNum: 100,
  },
  dark: {
    bg: theme.colors.gray[600],
    borderColor: theme.colors.gray[700],
    paletteNum: 200,
    inversePaletteNum: 700,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
