import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Main from "../pages/main";
import axios from "axios";


function index() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    index.getInitialProps = async () => {
      const {data : post} = await axios.get(``);
      setList(post)
      return { post }
    }
  }, []);

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <Main list={list}></Main>
    </div>
  );
}

export default index;
