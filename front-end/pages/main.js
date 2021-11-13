import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';
import Link from "next/link";

const Container = styled.div`
  margin-top: 300px;
`;

function main() {
  const [list, setList] = useState([]);

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