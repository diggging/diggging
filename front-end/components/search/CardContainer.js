import React from 'react';
import ListCard from './ListCard';
import styled from 'styled-components';
import { Router } from 'next/router';
import Link from 'next/link';
import { API_URL } from '../../config';

//데이터바인딩
function CardContainer({searchData}) {
  return (
    <StyledCardContainer>
        {searchData.map((data) => (
          <Link key={data.id} href={`/questions/${data.id}`} >
            <a>
            <ListCard data={data} />
            </a>
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
