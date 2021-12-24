import React from 'react'
import styled from 'styled-components';
import { lighten, darken } from 'polished';

function WhiteButton({ marginRight, paddingTop, paddingRight, fontSize, children, type, onClick }) {
  return (
    <StyledButton
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      fontSize={fontSize}
      type={type}
      onClick={onClick}
      marginRight={marginRight}
    >{children}</StyledButton>
  )
}

export default WhiteButton;
//0.625rem 1.5625rem;
const StyledButton = styled.button`
  padding-top: ${({ paddingTop }) => paddingTop};
  padding-bottom: ${({ paddingTop }) => paddingTop};
  padding-right: ${({ paddingRight }) => paddingRight};
  padding-left: ${({ paddingRight }) => paddingRight};
  margin-right: ${({marginRight}) => marginRight};

  border-radius: 1.25rem;
  border: solid 3px white;
  cursor: pointer;

  background-color: #FBFBFB;
  opacity: 80%;

  color: #5F5F5F;
  font-family: 'Pretendard-SemiBold';
  font-size: ${({ fontSize }) => fontSize};
  box-shadow: 0 0.25rem 0.75rem 0 rgba(0, 0, 0, 0.1);
  transition: 300ms;
  &:hover {
    background-color: ${lighten(0.02, '#FBFBFB')};
    box-shadow: 0 0.25rem 0.75rem 0 rgba(0, 0, 0, 0.15);

  }
  &:active {
    background-color: ${darken(0.02, '#FBFBFB')};
  }
`;
