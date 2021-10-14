<<<<<<< Updated upstream
import React from "react";
import styled from "styled-components";
=======
import NavBar from '../components/NavBar';
import GlobalStyles from './GlobalStyles';
>>>>>>> Stashed changes

const Title = styled.h1`
  font-size: 30px;
  color: darkgreen;
  font-weight: 600;
`;

function index() {
  return (
    <div>
<<<<<<< Updated upstream
      index페이지임
      <Title>안녕 스타일컴포넌트</Title>
=======
      <GlobalStyles/>
      <NavBar />
>>>>>>> Stashed changes
    </div>
  );
}

export default index;
