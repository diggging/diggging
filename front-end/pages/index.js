import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Main from "../pages/main";
import axios from "axios";


function index() {
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
      <NavBar />
      <Main ></Main>
    </div>
  );
}

export default index;
