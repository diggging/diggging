import React from 'react'
import styled from 'styled-components';

function YellowButton({ children, paddingTop, paddingRight }) {
  return (
    <StyledYellowButton paddingTop={paddingTop} paddingRight={paddingRight}>
      {children}
    </StyledYellowButton>
  )
}
export default YellowButton;

const StyledYellowButton = styled.button`
  padding: ${({ paddingTop }) => paddingTop} ${({ paddingRight }) => paddingRight};
  border-radius: 1.5625rem;
  

  background-color: #FFD358;
  color: #343434;
  font-family: 'Pretendard-SemiBold';
  font-size: 1rem;

  box-shadow: 0.25rem 0.25rem 0.5rem 0.25rem rgba(0, 0, 0, 0.1);
`;
