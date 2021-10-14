import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'

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

const VerticalElement = styled.div`
    margin: 0.5rem 0.5rem;
    border-radius: 0.625rem;
    text-align: center;
`; 

function navBar() {
    return (
        <div>
            <Nav>
                <NavLeft>
                    <NavVertical>
                        <VerticalElement>
                            <h4>diggging</h4>
                        </VerticalElement>
                    </NavVertical>
                </NavLeft>
                <NavLeft>
                    <NavVertical>
                        <VerticalElement>
                            <h4>디깅소개</h4>
                        </VerticalElement>
                    </NavVertical>
                </NavLeft>
            </Nav>
        </div>
    );
}

export default navBar;