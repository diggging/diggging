import React from 'react';
import ListCard from './ListCard';
import styled from 'styled-components';
import { Router } from 'next/router';
import Link from 'next/link';

//데이터바인딩
function CardContainer({searchData}) {


  return (
    <StyledCardContainer>
        {searchData.map((data) => (
          <Link href={`/questions/${data.id}`} >
            <ListCard key={data.id} data={data} />
          </Link>
        )
        )}
      </StyledCardContainer>
  )
}

const StyledCardContainer = styled.div`
  margin: 0 auto;
  max-width: 67rem;
`;

export default CardContainer
