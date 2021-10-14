import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image'
import NavSearch from '../public/static/images/Search';
import Alarm from '../public/static/images/Alarm';
import Directory from '../public/static/images/Directory';
import ToggleBtn from '../public/static/images/ToggleBtn';

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

const NavVertical = styled.div`
    text-align: center;
    padding-right: 0.4rem;
`;

const VerticalElement = styled.a`
    margin: 0.5rem 0.5rem;
    border-radius: 0.625rem;
    text-align: center;
    cursor: pointer;
`; 

const NavRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 3.125rem;
`;

//반응형
function navBar({ isLoggedIn }) {
    return (
        <div>
            <Nav>
                <NavLeft>
                    <NavVertical>
                        <Link href="/">
                            <VerticalElement>
                                diggging
                            </VerticalElement>
                        </Link>
                    </NavVertical>
                    <NavVertical>
                        <VerticalElement>
                            디깅소개
                        </VerticalElement>
                    </NavVertical>
                    {isLoggedIn ? (
                        <>
                            <NavVertical>
                                <Link href="/questions">
                                <VerticalElement>
                                    질문광장
                                </VerticalElement>
                                </Link>
                            </NavVertical>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </NavLeft>
                {isLoggedIn ? (
                    <>
                        <NavRight>
                            <NavVertical>
                                <VerticalElement>
                                    <NavSearch></NavSearch>
                                </VerticalElement>
                            </NavVertical>
                            <NavVertical>
                                <VerticalElement>
                                    <Alarm></Alarm>
                                </VerticalElement>
                            </NavVertical>
                            <NavVertical>
                                <VerticalElement>
                                    <Directory></Directory>
                                </VerticalElement>
                            </NavVertical>
                            <NavVertical>
                                <VerticalElement>
                                    <Directory></Directory>
                                </VerticalElement>
                            </NavVertical>
                        </NavRight>
                    </>
                ) : (
                    <>
                        <NavRight>
                            <NavVertical>
                                <Link href="/search">
                                    <VerticalElement>
                                        <NavSearch></NavSearch>
                                    </VerticalElement>
                                </Link>
                            </NavVertical>
                            <NavVertical>
                                <Link href="/login">
                                    <VerticalElement>
                                        로그인
                                    </VerticalElement>
                                </Link>
                            </NavVertical>
                            <NavVertical>
                                <Link href="/signup">
                                    <VerticalElement>
                                        회원가입
                                    </VerticalElement>
                                </Link>
                            </NavVertical>
                        </NavRight>
                    </>
                )}
            </Nav>
        </div>
    );
}

export default navBar;