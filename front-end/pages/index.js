import React, { useState } from "react";
import NavBar from "../components/NavBar";

function index() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <Editor />
    </div>
  );
}

export default index;
