import React from 'react';
import styled from 'styled-components';

function YellowTitle({ children, fontSize = "1rem", marginBottom = "0px" }) {
  return (
    <StyledYellowTitle fontSize={fontSize} marginBottom={marginBottom}>{children}</StyledYellowTitle>
  )
}

export default YellowTitle;

const StyledYellowTitle = styled.h2`
  display: inline;
  font-family: 'Pretendard-Bold';
  color: #FFBA42;
  font-size: ${({ fontSize }) => fontSize};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;
