import React from 'react'
import Image from 'next/image'
import styled from 'styled-components';

function NoResultMessage() {
  return (
    <div>
      <ImageWrapper>
        <Image src="/static/images/noResult.png" alt="noResult" layout="fixed" width={100} height={100} quality={95}/>
      </ImageWrapper>
      <NotFoundTitle>검색 결과를 찾을 수 없습니다.</NotFoundTitle>
      <NotFoundMessage>검색어를 다시 입력해보세요!</NotFoundMessage>
    </div>
  )
}

export default NoResultMessage

const ImageWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

const NotFoundTitle = styled.h2`
  font-family: 'Pretendard-Bold';
  font-size: 1.5rem;
  color: #343434;
  text-align: center;
  margin-bottom: 1.125rem;
  margin-top: 2.125rem;
`; 

const NotFoundMessage = styled.h4`
  font-family: 'Pretendard-Medium';
  font-size: 1.125rem;
  color: #343434;
  text-align: center;
`; 