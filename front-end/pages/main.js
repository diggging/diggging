import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';
import Link from "next/link";
import NavBar from "../components/NavBar";
import cookie from 'cookie';

const Container = styled.div`
  margin-top: 300px;
`;

function main() {
  const [list, setList] = useState([]);
  const refresh = cookie.parse('refresh');
  const access = cookie.parse('access');
  console.log(refresh)
  console.log(access)
  // const fetchPost = () => {
  //   main.getInitialProps = async () => {
  //     const {data : post} = await axios.get('http://127.0.0.1:8000/posts/1/detail/');
  //     setList(post);
  //     return { post }
  //   };
  // };

  // const fetchPost = async () => {
  //  const res = await axios.get('http://127.0.0.1:8000/posts/1/detail');
  //  setList(res.data);
  // }

  // useEffect(() => {
  //   fetchPost();
  // }, []);

    return (
        <div>
          <NavBar />
          <Container>

          {list.map((item) => (
              // <Link href={`/view/${item.id}`}>
              //   <div>
              //     {item.id}  
              //   </div>                
              // </Link>
              {item}
          ))}
          </Container>
        </div>
    );
}

export default main;