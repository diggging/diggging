import React from 'react'
import { ProfileBioBox } from '../../pages/accountSetting'
import FlexColumn from '../common/FlexColumn'
import WhiteButton from '../common/WhiteButton'
import YellowButton from '../common/YellowButton'
import styled from 'styled-components';
import Image from 'next/image'

function ProfileInfoBox ({user_profile_image, user_profile_content}) {
  console.log(user_profile_image)
  return (
    <ProfileBioBox padding="1.875rem">
      <ImageBox>
        <ProfileImgWrapper>
          <Image 
          src={user_profile_image}
          width={120} 
          height={120} 
          alt="profileImage" 
          quality={100}/>
          </ProfileImgWrapper>
        <WhiteButton paddingTop="0.625rem" paddingRight="2rem" fontSize="0.8125rem">프로필사진 변경</WhiteButton>
      </ImageBox>
      {user_profile_content ? (<ProfileBio>{user_profile_content}</ProfileBio>):(<ProfileBio>아직 자기소개가 없습니다.</ProfileBio>)}
    </ProfileBioBox>
  )
}

export default ProfileInfoBox

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ProfileImgWrapper = styled.div`
  width: 8.125rem;
  height: 8.125rem;
  object-fit: cover;
  margin-bottom: 0.8125rem;
  margin-right: 2.1875rem;
  & img {
    border-radius: 50%;
  }
`;

const ProfileBio = styled.p`
  height: 8.125rem;
  max-width: 34.0625rem;
  margin-top: 1.875rem;
  margin-left: 1rem;
  font-family: 'Pretendard-Regular';
  
  color: #8D8C85;
  font-size: 1rem;
  line-height: 1.625rem;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;