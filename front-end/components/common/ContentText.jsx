import React from 'react';
import styled from 'styled-components';

function ContentText({ children, fontSize = "1rem", color = "#8D8C85", lineHeight = "1.625rem" }) {
  return (
    <styledContentText fontSize={fontSize} color={color} lineHeight={lineHeight}>{children}</styledContentText>
  )
}

export default ContentText;

const styledContentText = styled.p`
  font-family: 'Pretendard-Regular';
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  line-height: ${({ lineHeight }) => lineHeight};
  margin-top: 1.875rem;
`;
