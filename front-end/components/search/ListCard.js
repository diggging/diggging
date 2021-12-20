import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FlexColumn from '../common/FlexColumn';
import FlexRow from '../common/FlexRow';
import Image from 'next/image'
import BookmarkIcon from '../../public/static/images/BookMarkIcon.js';
import HeartIcon from '../../public/static/images/HeartIcon.js';
import axios from 'axios';
import { API_URL } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Alert } from '../Alert';
import { alertService } from '../alert.service';
import { check_auth_status } from '../../redux/actions/auth';

function ListCard({data}) {
    const {created, id, answer_exist, desc, helped_num, hits, scrap_num, title, question_tags} = data;
    const {user_nickname, user_profile_image} = data.user;

    const createdAtDate = new Date(created);
    const createdYear = createdAtDate.getFullYear();
    const createdMonth = createdAtDate.getMonth() + 1;
    const createdDate = createdAtDate.getDate();
    const createdHour = createdAtDate.getHours();
    const createdMinutes = createdAtDate.getMinutes();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [Like, setLike] = useState(helped_num);
    const [token, setToken] = useState("");
    
    const router = useRouter();
    const dispatch = useDispatch();

    console.log(token, '함수밖token');

  return (
    <CardBox>
      <CardHead>
          <FlexColumn>
            <PostTitle>{title}</PostTitle>
            <TagWrapper>
              {question_tags.map((tag) => (<HashTag key={tag}>{tag}</HashTag>))}
            </TagWrapper>
          </FlexColumn>
          <ProfileBox>
            <ProfileImg src={`http://localhost:8000${user_profile_image}`}
                width={40}
                height={40}
                alt="profileImage"
                quality={100}
                // layout="fill"
                objectFit="cover"/>
            <Username>{user_nickname}</Username>
          </ProfileBox>
      </CardHead>
      <ContentWrapper>
        <PostContent>{desc}</PostContent>
      </ContentWrapper>
      <CardFooter>
        <PostDateInfo>{createdYear}년 {createdMonth}월 {createdDate}일 {createdHour}시 {createdMinutes}분</PostDateInfo>
        <div>
          {/* <BookMarkBtn /><NumberData>{scrap_num}</NumberData> */} 
          <HeartBtn /><NumberData>{helped_num}</NumberData>
          <Hit>조회</Hit><NumberData>{hits}</NumberData>
        </div>
      </CardFooter>
      <Alert />
    </CardBox>
  )
}

export default ListCard;


const CardHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

const CardBox = styled.button`
  min-width: 42.5rem;
  max-width: 67rem;
  width: 100%;
  height: 16rem;
  padding: 1.75rem 1.865rem 1.125rem 1.875rem;
  margin: auto;
  margin-bottom: 2rem;

  text-align: left;
  background-color: white;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.04);
`;

//title 글자수 표시제한 필요:54글자로.
const PostTitle = styled.h2`
  font-family: 'Pretendard-SemiBold';
  color: #343434;
  font-size: 1.25rem;
  margin-bottom: 0.6rem;

  min-width: 36.125rem;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;

  min-width: 36.125rem;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const HashTag = styled.span`
  height: 1.125rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  
  border-radius: 1.25rem;
  background-color: #F1EFE9;
  color: #7a7a7a;
  font-family: 'Pretendard-SemiBold';
  font-size: 0.625rem;
  line-height: 1;
`; 

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-left: 1rem;
`;

const ProfileImg = styled(Image)`
  border-radius: 50%;
  margin-bottom: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  margin: auto auto;
  margin-bottom: 4px;

  & > img {
    margin-bottom: 0.25rem;
  }
`;

const Username = styled.span`
  font-family: 'Pretendard-Medium';
  color: #343434;
  font-size: 0.875rem;
  text-align: center;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 7px;
`;



const ContentWrapper = styled.div`
  width:100%;
  height: 6.75rem;
  
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 4; //4줄이면 자르기
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PostContent = styled.p`
  font-family: 'Pretendard-Regular';
  color: #8D8C85;
  font-size: 0.875rem;
  line-height: 1.625rem;
  height: 5.875rem;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  span {
    vertical-align: middle;
  }
  svg {
    vertical-align: middle;
  }
`;

const PostDateInfo = styled.span`
  font-family: 'Pretendard-Regular';
  font-size: 0.6rem;
  color: #8C8D8D;
`;

const BookMarkBtn = styled(BookmarkIcon)`
  cursor: pointer;
  margin-right: 0.625rem;
  vertical-align: middle;

  &:hover path{
    fill: #FFD358;
  }
`;
const HeartBtn = styled(HeartIcon)`
  margin-left: 1rem;
  vertical-align: middle;

  path {
    fill: #FFD358;
  }
  /* & :hover path{
    fill: #FFD358;
  } */
`;

const NumberData = styled.span`
  font-family: 'Pretendard-Medium';
  font-size: 0.75rem;
  color: #8C8D8D;
  margin-left: 0.625rem;
`;

const Hit = styled.span`
  font-family: 'Pretendard-Semibold';
  font-size: 0.75rem;
  color: #8c8d8d;
  margin-left: 1rem;
`;