import React from 'react';
import styled from 'styled-components';

function ContentText({ children, fontSize = "1rem", color = "#8D8C85", lineHeight = "1.625rem" }) {
  return (
    <StyledContentText fontSize={fontSize} color={color} lineHeight={lineHeight}>{children}</StyledContentText>
  )
}

export default ContentText;

const StyledContentText = styled.p`
  font-family: 'Pretendard-Regular';
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  line-height: ${({ lineHeight }) => lineHeight};
`;
