import React from 'react'
import WhiteButton from "../common/WhiteButton";
import FlexRow from "../common/FlexRow";
import GreyInput from "../common/GreyInput";
import YellowButton from "../common/YellowButton";
import YellowTitle from "../common/YellowTitle";
import ContentText from "../common/ContentText";
import FlexColumn from "../common/FlexColumn";
import { FormBox, PageTitle } from "../../pages/findPassword";
import {logout} from "../../redux/actions/auth";
import Image from "next/image";
import styled from 'styled-components';

function AccountSetForm({userData}) {
  //로그아웃 : 로그아웃 시키고 메인으로 이동
  const onClickLogout = async () => {
    await dispatch(logout());
    router.push('/');
  }

  console.log(userData,  `페이지 안의 userData`)
  const {user} = userData;
  const {user_nickname, email, user_profile_image, user_profile_content} = user;

  const preventSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <FormBox>
      <PageTitle>계정 설정하기</PageTitle>
      <NicknameBox>
        <ProfileTitle>{user_nickname}</ProfileTitle><ProfileTitle2>님의 프로필</ProfileTitle2>
      </NicknameBox>
      <ProfileBioBox padding="1.875rem">
        <FlexColumn>
          <ProfileImgWrapper><Image src={user_profile_image} width={130} height={130} alt="profileImage" quality={100}/></ProfileImgWrapper>
          <WhiteButton paddingTop="0.625rem" paddingRight="2rem" fontSize="0.8125rem">프로필사진 변경</WhiteButton>
        </FlexColumn>
        {user_profile_content ? (<ProfileBio>{user_profile_content}</ProfileBio>):(<ProfileBio>아직 자기소개가 없습니다.</ProfileBio>)}
      </ProfileBioBox>
        <ProfileBox padding="2.125rem">
          <ProfileBioInput onKeyPress={preventSubmit} placeholder='자기소개를 입력하세요.'/>
          <YellowButton paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
        </ProfileBox>
        <ProfileBox padding="2.375rem">
          <YellowTitle>이메일</YellowTitle>
          <ContentText>{email}</ContentText>
        </ProfileBox>
        <ProfileBox padding="2.625rem">
          <YellowTitle>닉네임 설정</YellowTitle>
          <GreyInput width="25rem" height="3.125rem" marginLeft="3rem" marginRight="2.625rem" />
          <YellowButton paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
        </ProfileBox>
        <PasswordResetBox>
          <YellowTitle marginBottom="0.75rem">비밀번호 변경</YellowTitle>
          <PasswordMessage>새 비밀번호를 입력하시면 비밀번호가 변경됩니다.</PasswordMessage>
          <PasswordInputBox>
            <div>
              <GreyInput width="12rem" height="3.125rem" marginRight="0.75rem" />
              <GreyInput width="12rem" height="3.125rem" marginRight="0.75rem" />
              <GreyInput width="12rem" height="3.125rem" marginRight="3.75rem" />
            </div>
            <YellowButton paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
          </PasswordInputBox>
        </PasswordResetBox>
        <AccountBtnBox>
          {/* <WhiteButton paddingTop="0.625rem" paddingRight="2rem" fontSize="0.8125rem">회원탈퇴 😥</WhiteButton> */}
          <WhiteButton 
            onClick={onClickLogout}
            paddingTop="0.625rem" 
            paddingRight="2rem" 
            fontSize="0.8125rem"
            >로그아웃 💨 </WhiteButton>
        </AccountBtnBox>
        {/* <Link href="">변경하기</Link> 여기에 reset password url필요 */}
      </FormBox>
  )
}

export default AccountSetForm;


const NicknameBox = styled.header`
  margin-top: 5.375rem;
  margin-bottom: 1.875rem;
  padding-bottom: 1.5rem;
  border-bottom: solid 1px #e5e5e5;
`;

const ProfileTitle = styled.span`
  font-size: 1.625rem;
  color: #FFBA42;
  font-family: 'Pretendard-Bold';
  margin-bottom: 1.5rem;
`;

const ProfileTitle2 = styled.span`
  font-size: 1.25rem;
  color: #FFBA42;
  font-family: 'Pretendard-Bold';
  margin-left:0.125rem;
`;

const ProfileBox = styled.section`
  display: flex;
  flex-direction: row;
  padding: ${({padding}) => padding} 0;
  border-bottom: solid 2px #e5e5e5;
  justify-content: flex-start;
  align-items: center;
  justify-content: space-between;
`;

const ProfileBioBox = styled(ProfileBox)`
  justify-content: flex-start;
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
const ProfileBioInput = styled.textarea`
  width: 34.375rem;
  height: 8.125rem;
  margin-left: 0.375rem;
  margin-right: 2.625rem;
  outline: none;
  border: none;
  font-family: 'Pretendard-Regular';
  font-size: 0.875rem;
  color: #999893; 

  background-color:#F5F5F7;
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
`;

const PasswordResetBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.875rem 0;
  border-bottom: solid 2px #e5e5e5;
  justify-content: space-between;
`;
const PasswordInputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2.125rem;
`;

const PasswordMessage = styled(ContentText)`
  margin-bottom: 2.125rem;
`;

const AccountBtnBox = styled.div`
  display: flex;
  margin-top: 4rem;
  flex-direction: row;
  justify-content: flex-end;
`;