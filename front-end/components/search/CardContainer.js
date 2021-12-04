import React from 'react';
import ListCard from './ListCard';
import styled from 'styled-components';

//데이터바인딩
function CardContainer({searchData}) {
  return (
    <StyledCardContainer>
        {searchData.map((data) => (
        <ListCard key={data.id} searchData={searchData}/>
        )
        )}
      </StyledCardContainer>
  )
}

const StyledCardContainer = styled.div`
  margin: 0 auto;
`;

export default CardContainer
