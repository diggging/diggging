import React from 'react'
import styled from 'styled-components';
import BookMarkIcon from '../public/static/images/BookMarkIcon';
import HeartIcon from '../public/static/images/HeartIcon';
import AnswerIcon from '../public/static/images/AnswerIcon';
import AnswerSelectedIcon from '../public/static/images/AnswerSelectedIcon';
import CommentIcon from '../public/static/images/CommentIcon';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';


function AlarmList() {
  //안 읽었을 때 아이콘 #FFE59C, 읽었을 때 #E4E1D6
  //alarm get해서 isChecked state로 정의해서 관리하기
  //읽었을 경우 isChecked true설정하고, api로 post하기
  //알람 리스트 배열로 받아와서 map으로 돌리기.
  //시간 최신순으로 정렬해서 9개 보여주기
  //알람 종류에 따라 아이콘 다르게 보여주기
  const router = useRouter();

  const onClickMoveDetail = () => {
    // router.push(`/questions/${id}`);
    router.push(`/questions/1`);
  }
  return (
    <ListBox onClick={onClickMoveDetail}>
      <AlarmIconBox>
        {/* {isChecked ? (<AlarmIcon className="Yellow"/>):(<AlarmIcon className="Grey"/>)} */}
        <BookMarkIcon /> 
      </AlarmIconBox>
      <AlarmContentBox>
        <AlarmPostTitle>Next.js SSR관련 질문있습니다...도와주세요 아무나 제발요</AlarmPostTitle>
        <AlarmPostContent>음 Next.js는 우선 기본적으로 SSR과 SSG 둘다 지원하기 때문에 괜찮습니다</AlarmPostContent>
        <AlarmTime>2시간 전</AlarmTime>
      </AlarmContentBox>
      <AlarmIconBox>
        <ProfileImg src="/static/images/profile.jpg" alt="profileImage" quality={65} width={35} height={35} layout="fixed"/>
      </AlarmIconBox>
    </ListBox>
  )
}

export default AlarmList


const ListBox = styled.button`
  width: 100%;
  max-height: 4.875rem;
  display: flex;
  flex-direction: row;
  background: none;
  border-bottom: solid 1px #e5e5e5;
`;

const AlarmIconBox = styled.div`
  width: 3.75rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlarmContentBox = styled.div`
  padding: 0.625rem 0.25rem;
  max-width: 16.75rem;
  text-align: left;
`;

const AlarmPostTitle = styled.h5`
  font-family: 'Pretendard-Medium';
  color: #343434;
  font-size: 0.75rem;
  margin-bottom: 0.125rem;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1; //1줄이면 자르기
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const AlarmPostContent = styled.p`
  font-family: 'Pretendard-Regular';
  color: #8d8c85;
  font-size: 0.6875rem;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1; //1줄이면 자르기
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const AlarmTime = styled.p`
  font-family: 'Pretendard-Regular';
  color: #B6B6B6;
  font-size: 0.6875rem;
  margin-top: 0.2rem;
`;

const ProfileImg = styled(Image)`
  width: 1.875rem;
  height: 1.875rem;
  object-fit: cover;
  border-radius: 50%;
  border: 0px
`;

