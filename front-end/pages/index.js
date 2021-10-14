import React, { useState } from "react";
import NavBar from '../components/NavBar';

function index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default index;
