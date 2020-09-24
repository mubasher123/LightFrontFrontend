import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const ReactApp = process.env.NODE_ENV === "development" ? hot(App) : App;
ReactDOM.render(
  <ReactApp />,

  document.getElementById("root")
);
