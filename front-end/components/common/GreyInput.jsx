import React from 'react'
import styled from 'styled-components';

const StyledGreyInput = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 0.875rem 1rem;
  margin-right: ${({ marginRight }) => marginRight};
  margin-left: ${({ marginLeft }) => marginLeft};

  outline: none;
  border: none;
  font-family: 'Pretendard-Regular';
  font-size: 0.875rem;
  color: #999893; 

  background-color:#F5F5F7;
  border-radius: 0.5rem;
`;

function GreyInput({ width, height, marginRight, marginLeft }) {
  return (
    <StyledGreyInput width={width} height={height} marginRight={marginRight} marginLeft={marginLeft} type="text" />
  ) /// 여기 children넣고 닫는태그넣어보자
}
export default GreyInput;



