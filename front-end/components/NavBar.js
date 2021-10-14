import React, { Children } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import NavSearch from "../public/static/images/Search";
import Alarm from "../public/static/images/Alarm";
import Directory from "../public/static/images/Directory";
import ToggleBtn from "../public/static/images/ToggleBtn";
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

function navBar({isLoggedIn}) {
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
          {isLoggedIn ? (
            <>
            <Link href="/questions" passHref>
                <NavItem>질문광장</NavItem>
            </Link>
            </>
          ) : (
            <></>
          )}
        </NavLeft>
        <NavRight>
          <Link href="/search" passHref>
            <NavItem>
              <NavSearch />
            </NavItem>
          </Link>
          {isLoggedIn ? (
            <>
            <Link href="/" passHref>
                <NavItem>
                    <Alarm />
                </NavItem>
            </Link>
            <Link href="/" passHref>
                <NavItem>
                    <Directory />
                </NavItem>
            </Link>
            {/* //프로필 */}
            <Link href="/" passHref>
                <NavItem>
                    <Directory />
                </NavItem>
            </Link>
            </>
          ) : (
            <>
            <Link href="/login" passHref>
                <NavItem>로그인</NavItem>
            </Link>
            <Link href="/signup" passHref>
                <NavItem>회원가입</NavItem>
            </Link>
            </>
          )}
        </NavRight>
      </Nav>
    </div>
  );
}

export default navBar;
