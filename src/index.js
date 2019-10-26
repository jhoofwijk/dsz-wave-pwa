import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import localforage from "localforage";

localforage.config({
  name: "WaveApp",
  storeName: "User details",
  description: "Username and email address used for enrolling.",
});

ReactDOM.render(<App />, document.getElementById("root"));
