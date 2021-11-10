import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NavSearch from '../public/static/images/Search';
import Alarm from '../public/static/images/Alarm';
import Directory from '../public/static/images/Directory';
import ToggleBtn from '../public/static/images/ToggleBtn';
import SvgDiggging from '../public/static/images/Diggging';
import img from '../public/static/images/profile_img.jpg';
import {useSelector, useDispatch} from 'react-redux;'
import {logout} from '../redux/actions/auth';

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

const ToggleContainer = styled.button`
  background-color: #ffffff;
  border-radius: 0.625rem;
  text-align: center;
  padding: 0.3125rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #9faeb6;

  & svg {
    margin-left: 10px;
  }
`;

const UserImg = styled.div`
  background-image: url(${Alarm});
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #b6b6b6;
`;

const DropBox = styled.div`
  background-color: white;
  box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05);
  width: 11.875rem;
  padding: 0 1.5rem;
`;

const DropList = styled.ul`
  list-style: none;
  line-height: 2rem;
  font-family: 'Pretendard-Regular';
  color: '#B6B6B6';

`;

function navBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout());
    }
  };
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
          <Link href="/main" passHref>
            <NavItem>메인</NavItem>
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/questions" passHref>
                <NavItem>질문광장</NavItem>
              </Link>
            </>
          ) : (
            <></>
          )}
          <Link href="/postCreate" passHref>
            <NavItem>기록하기</NavItem>
          </Link>
        </NavLeft>
        <NavRight>
          <Link href="/search" passHref>
            <NavItem>
              <NavSearch />
            </NavItem>
          </Link>
          {isAuthenticated ? (
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
              <NavItem>
                <ToggleContainer onClick={() => {setOpen(!open)}}>
                  <UserImg />
                  <ToggleBtn />
                </ToggleContainer>
                <DropBox>
                  <DropList>
                    <li>새 글 작성</li>
                    <li>내 디렉토리</li>
                    <li>계정설정</li>
                    <li><a href="#!" onclick={logoutHandler}>로그아웃</a></li>
                  </DropList>
                </DropBox>
              </NavItem>
            </>
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

export default navBar;
