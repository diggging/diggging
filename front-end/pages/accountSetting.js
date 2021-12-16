import React, { useEffect } from "react";
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../hocs/Layout";
import { load_user } from "../redux/actions/auth";
import { useRouter } from "next/router";
import ProfileInfoBox from "../components/users/ProfileInfoBox";
import FlexRow from "../components/common/FlexRow";
import WhiteButton from "../components/common/WhiteButton";
import GreyInput from "../components/common/GreyInput";
import YellowButton from "../components/common/YellowButton";
import YellowTitle from "../components/common/YellowTitle";
import ContentText from "../components/common/ContentText";
import FlexColumn from "../components/common/FlexColumn";
import { FormBox, PageTitle } from "../pages/findPassword";

function accountSetting() {
  //1. profileImg변경하기
  //2. profileBio변경하기
  //3. email주소 보여주기
  //4. 닉네임 변경하기
  //5. 비밀번호 변경하기
  //5-1.기존 비밀번호 맞는지 확인하기
  //5-2 맞으면 입력된 값으로 수정하기
  const router = useRouter();
  const {user} = router.query;
  const userData = JSON.parse(user);
  const userInfo = userData.user;
  const {user_nickname, email, id, user_profile_image, user_profile_content} = userInfo;

  const onClickLogout = async () => {
    await dispatch(logout());
    router.push('/');
  }
  const preventSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }
  return (
    <>
    <Layout
      title='Diggging | 계정설정'
      content='개발자들을 위한 커뮤니티 디깅 계정설정 페이지'  
    >
      <NavBar />
      <FormBox>
        <PageTitle>계정 설정하기</PageTitle>
        <NicknameBox>
          <ProfileTitle>{user_nickname}</ProfileTitle><ProfileTitle2>님의 프로필</ProfileTitle2>
        </NicknameBox>
        <ProfileInfoBox id={id} user_profile_image={user_profile_image} user_profile_content={user_profile_content} />
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
    </Layout>
  </>
  );
}

export {ProfileBioBox};
export default accountSetting;


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
