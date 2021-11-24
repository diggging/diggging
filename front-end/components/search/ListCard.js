import React from 'react';
import styled from 'styled-components';

function ListCard() {
  return (
    <CardBox>
      <PostTitle>iOS15 대응기 (feat. 크로스 브라우징)</PostTitle>
      <HashTag>iOS</HashTag>
      <HashTag>크로스브라우징</HashTag>
      <HashTag>cross-browsing</HashTag>
      <PostContent>2021년 9월 20일에 iOS15가 업데이트 되었습니다. 이번 릴리즈에는 Safari 브라우저에서 아주 큰 변화가 있었어요. 바로 브라우저 내의 주소창이 아래로 이동이 되었다는점! 채널톡은 위처럼 고객이 메시지를 입력할 수 있는 입력란이 하단에 있어요. 항상 고객에게 최고의 채팅경험을 제공하기 위해 끊임없이 고민하는 채널팀에게는 키보드를 열었을때 입력창이 가려지는 문제는 너무나도 치명적이었죠. 뿐만 아...</PostContent>
    </CardBox>
  )
}

export default ListCard;

const CardBox = styled.div`
  max-width: 67rem;
  height: 15.325rem;
  display: flex;
  flex-direction: row;

  background-color: white;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.04);
`;

//title 글자수 표시제한 필요:54글자로.
const PostTitle = styled.h2`
  font-family: 'Pretendard-SemiBold';
  color: #343434;
  font-size: 1.25rem;
`;

const PostContent = styled.p`
  font-family: 'Pretendard-Regular';
  color: #8D8C85;
  font-size: 0.875rem;
  line-height: 1.625rem;
`;

const HashTag = styled.span`
  height: 1.125rem;
  padding: 0.25rem 0.5rem;
  
  border-radius: 1.25rem;
  background-color: #F1EFE9;
  color: #7a7a7a;
  font-family: 'Pretendard-SemiBold';
  font-size: 0.625rem;

`; 