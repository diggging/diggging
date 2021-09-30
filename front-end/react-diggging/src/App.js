import React from "react";
import { Route } from "react-router-dom";
import Main from "../src/routes/Main";
import GlobalStyles from "./GlobalStyles";
import GlobalFonts from "./static/fonts/font.js";

function App() {
  return (
    <div>
      <GlobalStyles />
      <GlobalFonts />
      <Route path="/" exact>
        <Main />
      </Route>
    </div>
  );
}

export default App;
