import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//alarm 기능
//Link로 페이지 이동 : 서비스 소개, 글쓰기,
//로긴 됐을 때 안됐을 때 다르게 보이기
//가운데 로고넣기

const NavBody = styled.div`
  /* 정렬 및 크기 */
  width: 100%;
  z-index: 1000;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 1rem;
  height: 4rem;

  /* 색상 및 스타일링 */
  background-color: #ffffff;
  box-shadow: 0rem 0.25rem 0.625rem rgba(0, 0, 0, 0.05);
`;

const NavLeft = styled.div``;

//NavItem은 vertical-element class참조.
const NavItem = styled.li`
  margin: 0.5rem;
`;

function Navbar() {
  return (
    <>
      <NavBody />
    </>
  );
}

export default Navbar;
