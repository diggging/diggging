import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Main from "../pages/main";
import axios from "axios";


function index() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [list, setList] = useState([]);

  // const fetchPost = () => {
  //   index.getInitialProps = async () => {
  //     const {data : post} = await axios.get(``);
  //     setList(post)
  //     return { post }
  //   };
  // };

  // useEffect(() => {
  //   fetchPost();
  // }, []);

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <Main ></Main>
    </div>
  );
}

export default index;
