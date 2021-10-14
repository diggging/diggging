import React from "react";
import styled from "styled-components";
import Link from "next/link";

const NavMenu = styled.li`
  list-style: none;
  text-decoration: none;
  color: ;
`;

function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/login">
            <a>로그인</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>diggging</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
