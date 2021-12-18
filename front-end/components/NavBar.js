import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NavSearch from '../public/static/images/Search';
// import Directory from '../public/static/images/Directory';
import SvgDiggging from '../public/static/images/Diggging';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../redux/actions/auth'
import { check_auth_status } from '../redux/actions/auth';
import { load_user } from '../redux/actions/auth';
import { changePage } from "../modules/questions";
import AuthMenu from "./AuthMenu";

function navBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  //계정설정 이동시 유저 데이터 넘겨주기
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(load_user()); 
    }
  }, [dispatch])

  return (
    <div>
      <Nav>
        <NavLeft>
          <Link href="/" passHref>
            <NavItem>
              <SvgDiggging />
            </NavItem>
          </Link>
          {/* <Link href="/aboutus" passHref>
            <NavItem>디깅소개</NavItem>
          </Link> */}
          {/* <Link href="/main" passHref>
            <NavItem>메인</NavItem>
          </Link> */}
          {/* {isAuthenticated ? (
            <>
              <Link href="/questions" passHref>
                <NavItem>질문광장</NavItem>
              </Link>
            </>
          ) : (
            <></>
          )} */}
        </NavLeft>
        <NavRight>
          <Link href="/search" passHref>
            <NavItem>
              <NavSearch height="1.5rem" width="1.375rem"/>
            </NavItem>
          </Link>
          {isAuthenticated ? ( <>asdasd</>
            // <AuthMenu /> 
          ) : (
            <>
              <Link href="/loginPage" passHref>
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

export {NavItem}
export default navBar;

  
const Nav = styled.nav`
min-width: 42.5rem;
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

const NavItem = styled.a`
font-family: 'Pretendard-SemiBold';
display: flex;
margin: 0.5rem 0.5rem;
border-radius: 0.625rem;
text-align: center;
-webkit-text-decoration: none;
text-decoration: none;
padding-right: 0.4rem;
color: #b6b6b6;
align-items: center;

&:hover {
  color: #202020;
  font-family: 'Pretendard-Bold';
  transition: all ease-in 200ms;
}

&:hover path {
  fill: #202020;
  transition: all ease-in 200ms;
}
`;

const NavRight = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-right: 3.125rem;
`;
