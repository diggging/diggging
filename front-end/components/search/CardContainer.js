import React from 'react'
import ListCard from './ListCard'
import styled from 'styled-components'

function CardContainer() {
  return (
    <StyledCardContainer>
      <ListCard />
    </StyledCardContainer>
  )
}

const StyledCardContainer = styled.div`
  margin: 0 auto;
`;

export default CardContainer
