import React from 'react'
import styled from 'styled-components';
function GreyInput({ width, height, marginRight, marginLeft }) {
  return (
    <styledGreyInput width={width} height={height} marginRight={marginRight} marginLeft={marginLeft} type="text" />
  )
}
const styledGreyInput = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 0.875rem 1rem;
  margin-right: ${({ marginRight }) => marginRight};
  margin-left: ${({ marginLeft }) => marginLeft};

  font-family: 'Pretendard-Regular';
  font-size: 0.875rem;
  color: #C4C4C4; 

  background-color:#2e2e5d;
  border-radius: 0.5rem;
`;
export default GreyInput;