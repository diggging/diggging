import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import YellowButton from '../../components/common/YellowButton';

function userInactivated() {
  return (
    <AlarmWrapper>
      <Image src="/static/images/email.png" width={84} height={48} alt="email_icon" quality={100}/>
      <AlarmTitle>메일 인증이 완료되었습니다</AlarmTitle>
      <AlarmDesc>아래 링크를 타고 메인페이지로 이동해주세요</AlarmDesc>
      <YellowButton paddingTop="0.875rem" paddingRight="1.875rem">메인으로</YellowButton>
    </AlarmWrapper>
  )
}

export default userInactivated


const AlarmWrapper = styled.div`
  display: block;
  width: 28rem;
  height: 17.5rem;
  margin: auto auto;
  text-align: center;
  padding-top: 2.5rem;
  box-shadow: 10px 10px 40px 0px rgb(1 1 1 / 10%);
  border-radius: 20px;
  margin-top: 10vh;
`;

const AlarmTitle = styled.h1`
  font-size: 1.5rem;
  color: #343434;
  font-family: 'Pretendard-Bold';
  margin-bottom: 0.1rem;
  margin-top: 1.25rem;
`;

const AlarmDesc = styled.h3`
  font-size: 1rem;
  color: #343434;
  font-family: 'Pretendard-Medium';
  margin-bottom: 20px;
`;