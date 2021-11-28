import React from 'react';
import styled from 'styled-components';

function FlexRow({ children }) {
  return (
    <StyledFlexRow>
      {children}
    </StyledFlexRow>
  )
}

export default FlexRow;

const StyledFlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
