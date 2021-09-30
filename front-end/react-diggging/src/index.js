import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "./firebase";
import { BrowserRouter } from "react-router-dom";

console.log(firebase);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter
      basename={optionalString}
      forceRefresh={optionalBool}
      getUserConfirmation={optionalFunc}
      keyLength={optionalNumber}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
