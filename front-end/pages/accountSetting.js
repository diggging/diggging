import React, { useEffect } from "react";
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../hocs/Layout";
import { load_user } from "../redux/actions/auth";
import { useRouter } from "next/router";
import AccountSetForm from "../components/users/AccountSetForm";

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
  return (
    <>
    <Layout
      title='Diggging | 계정설정'
      content='개발자들을 위한 커뮤니티 디깅 계정설정 페이지'  
    >
      <NavBar />
      <AccountSetForm userData={userData}/>
    </Layout>
  </>
  );
}

export default accountSetting;

