import React, { useEffect } from 'react';
import styled from 'styled-components';
import FlexColumn from '../common/FlexColumn';
import FlexRow from '../common/FlexRow';
import Image from 'next/image'
import BookmarkIcon from '../../public/static/images/BookMarkIcon.js';


function ListCard({searchData}) {
    const {createdAt, answer_exist, desc, helped_num, hits, scrap_num, title, user} = searchData;
    const {user_nickname, user_profile_image} = user
  return (
    <CardBox>
      <CardHead>
          <FlexColumn>
            <PostTitle>{title}</PostTitle>
            <FlexRow>
              {/* {hashTag.map((tag) => (<HasTag>{tag}</HasTag>)} */}
              <HashTag>iOS</HashTag>
              <HashTag>크로스브라우징</HashTag>
              <HashTag>cross-browsing</HashTag>
            </FlexRow>
          </FlexColumn>
          <ProfileBox>
            <ProfileImg src={user_profile_image} alt="profileImg" width={40} height={40} layout="fixed"/>
            <Username>{user_nickname}</Username>
          </ProfileBox>
      </CardHead>
      <PostContent>{desc}</PostContent>
      <CardFooter>
        <BookmarkIcon /> {scrap_num}
        <BookmarkIcon /> {helped_num}
      </CardFooter>
    </CardBox>
  )
}

export default ListCard;


const CardHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.25rem;
`;

const CardBox = styled.div`
  max-width: 67rem;
  height: 15.325rem;
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.865rem 1.125rem 1.875rem;

  background-color: white;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.04);
`;

//title 글자수 표시제한 필요:54글자로.
const PostTitle = styled.h2`
  font-family: 'Pretendard-SemiBold';
  color: #343434;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const HashTag = styled.span`
  height: 1.125rem;
  padding: 0.25rem 0.5rem;
  margin: 0 0.25rem;
  
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
  justify-content: flex-end;
`;

const BookMarkBtn = styled(BookmarkIcon)`
  &:hover path{
    fill: #FFD358;
  }
`;