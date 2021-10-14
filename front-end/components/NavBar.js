import React, { Children } from "react";
import styled from "styled-components";
import Link from "next/link";
import SvgDiggging from "../public/static/images/Diggging";

const Nav = styled.nav`
  z-index: 1000;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  box-shadow: 0rem 0.25rem 0.625rem rgba(0, 0, 0, 0.05);
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 3.125rem;
`;

// const NavItem = React.forwardRef(({ onClick, href }, ref, children) => {
//   return (
//     <a href={href} onClick={onClick} ref={ref}>
//       {children}
//     </a>
//   );
// });

const NavItem = styled.a`
  margin: 0.5rem 0.5rem;
  border-radius: 0.625rem;
  text-align: center;
  text-decoration: none;
  padding-right: 0.4rem;
  color: #b6b6b6;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3.125rem;
`;

//svg 폴더, 조건부 렌더링, 라우팅, 로그인, 로그아웃, 디깅소개, 검색, component 네이밍, 반응형
const NavSearch = () => {
  return (
    <svg width="23" height="23" viewBox="0 0 20 20" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.3243 4.98201C14.3159 6.97369 14.3159 10.2028 12.3243 12.1945C10.3326 14.1862 7.10345 14.1862 5.11177 12.1945C3.1201 10.2028 3.1201 6.97369 5.11177 4.98201C7.10345 2.99034 10.3326 2.99034 12.3243 4.98201ZM14.8612 12.8929C16.9167 9.96687 16.6367 5.90038 14.0213 3.28496C11.0924 0.356024 6.34365 0.356024 3.41472 3.28496C0.485785 6.21389 0.485785 10.9626 3.41472 13.8916C6.07942 16.5563 10.2504 16.7967 13.1869 14.6127L17.8336 19.2595C18.3022 19.7281 19.062 19.7281 19.5307 19.2595C19.9993 18.7908 19.9993 18.031 19.5307 17.5624L14.8612 12.8929Z"
      ></path>
    </svg>
  );
};

function navBar() {
  return (
    <div>
      <Nav>
        <NavLeft>
          <Link href="/" passHref>
            <NavItem>
              <SvgDiggging />
            </NavItem>
          </Link>
          <Link href="/aboutus" passHref>
            <NavItem>디깅소개</NavItem>
          </Link>
        </NavLeft>
        <NavRight>
          <Link href="/search" passHref>
            <NavItem>
              <NavSearch />
            </NavItem>
          </Link>
          <Link href="/login" passHref>
            <NavItem>로그인</NavItem>
          </Link>
          <Link href="signup" passHref>
            <NavItem>회원가입</NavItem>
          </Link>
        </NavRight>
      </Nav>
    </div>
  );
}

export default navBar;
