import React, { useEffect } from "react";
import { FormBox, PageTitle } from "./findPassword";
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Layout from "../hocs/Layout";
import WhiteButton from "../components/common/WhiteButton";
import FlexRow from "../components/common/FlexRow";
import GreyInput from "../components/common/GreyInput";
import YellowButton from "../components/common/YellowButton";
import YellowTitle from "../components/common/YellowTitle";
import ContentText from "../components/common/ContentText";
import FlexColumn from "../components/common/FlexColumn";


function accountSetting() {
  const user = useSelector(state => state.auth.user);
  const {id, username, profile_img, profile_bio, user_nickname, email, login_method} = user.user;

  // useEffect(()=>{
  //   // dispatch(load_user());
  //   dispatch(check_auth_status);
  // }, [dispatch])


  //1. profileImg변경하기
  //2. profileBio변경하기
  //3. email주소 보여주기
  //4. 닉네임 변경하기
  //5. 비밀번호 변경하기
  //5-1.기존 비밀번호 맞는지 확인하기
  //5-2 맞으면 입력된 값으로 수정하기

  return (
    <>
    <Layout
      title='Diggging | 계정설정'
      content='개발자들을 위한 커뮤니티 디깅 계정설정 페이지'  
    >
      <NavBar />
      <FormBox>
        <PageTitle>계정 설정하기</PageTitle>
        <ProfileTitle>{username}</ProfileTitle><ProfileTitle2>님의 프로필</ProfileTitle2>
        <ProfileBox padding="1.875rem">
          <FlexColumn>
            <ProfileImgWrapper><img src={profile_img} alt="profileImage" /></ProfileImgWrapper>
            <WhiteButton paddingTop="0.625rem" paddingRight="2rem" fontSize="0.8125rem">프로필사진 변경</WhiteButton>
          </FlexColumn>
          {/* <ProfileBio>{profile_bio}</ProfileBio> */}
          <ProfileBio>안녕하세요 디깅 서비스 만들려고 100일 동안 삽질만 한 사람입니다.
          제발 쉬게해주세요....
          </ProfileBio>
        </ProfileBox>
        <ProfileBioBox padding="2.125rem">
          <GreyInput width="34.375rem" height="8.125rem" marginLeft="0.375rem" marginRight="2.625rem"/>
          <YellowButton paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
        </ProfileBioBox>
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
          <FlexRow>
            <GreyInput width="11rem" height="3.125rem" marginRight="0.75rem" />
            <GreyInput width="11rem" height="3.125rem" marginRight="0.75rem" />
            <GreyInput width="11rem" height="3.125rem" marginRight="3.75rem" />
            <YellowButton paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
          </FlexRow>
        </PasswordResetBox>
        <AccountBtnBox>
          {/* <WhiteButton paddingTop="0.625rem" paddingRight="2rem" fontSize="0.8125rem">회원탈퇴 😥</WhiteButton> */}
          <WhiteButton paddingTop="0.625rem" paddingRight="2rem" fontSize="0.8125rem">로그아웃 💨 ️</WhiteButton>
        </AccountBtnBox>
        {/* <Link href="">변경하기</Link> 여기에 reset password url필요 */}
      </FormBox>
    </Layout>
  </>
  );
}

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
`;

const UsernameText = styled.h2`
  font-size: 1rem;
  color: #FFBA42;
  font-family: 'Pretendard-Bold';
  margin-bottom: 1.375rem;
  border-bottom: solid 1px #e5e5e5;
`;

const ProfileBox = styled(FlexRow)`
  padding: ${({padding}) => padding} 0;
  border-bottom: solid 2px #e5e5e5;
  justify-content: space-between;
`;

const ProfileImgWrapper = styled.div`
  border-radius: 50%;
  width: 8.125rem;
  height: 8.125rem;
  object-fit: cover;
  margin-bottom: 0.8125rem;
`;

const ProfileBio = styled(ContentText)`
  margin-top: 1.875rem;
`;

const ProfileBioBox = styled(ProfileBox)`
  align-items: flex-end;
`;

const PasswordResetBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.875rem 0;
  border-bottom: solid 2px #e5e5e5;
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
export default accountSetting;

