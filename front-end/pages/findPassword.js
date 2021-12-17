import React, {useState} from 'react'
import Layout from '../hocs/Layout';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import GreyInput from '../components/common/GreyInput';
import YellowButton from "../components/common/YellowButton";
import YellowTitle from '../components/common/YellowTitle';
import {alertService} from '../components/alert.service';
import { Alert } from '../components/Alert';
import { reset_password } from '../redux/actions/auth';
import { Router, useRouter } from 'next/router';
import { connect, useDispatch } from 'react-redux';

function findPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [requestSent, setRequestSent] = useState(false)

  const onInput = (e) => {
    setEmail(e.target.value);
  }

  //API주소 과연맞는가... 404에러뜬다
  const onSubmitEmail = async (e) => {
    e.preventDefault();

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(reset_password(email))
      .then((res) => alertService.warn(res, 'gkdl'))
      .catch((err)=>alertService.warn(err))
    }
    setRequestSent(true);
  }
  
  return (
    <>
      <Layout/>
      <NavBar />
      <FormBox onSubmit={(e) => onSubmitEmail(e)}>
      <Alert />
        <PageTitle>비밀번호 찾기</PageTitle>
        <GuideMessage>가입하신 이메일을 입력하시면 해당 주소로 비밀번호 변경 링크를 보내드립니다.</GuideMessage>
          <YellowTitle fontSize="1.375rem" >이메일</YellowTitle>
          <GreyInput
            width="28.75rem"
            height="3.125rem"
            marginRight="2.875rem"
            marginLeft="2.75rem"
            type="email"
            placeholder="이메일"
            onChange={(e) => onInput(e)}
            value={email}
            required
          />
          <YellowButton type="submit" paddingTop="0.9375rem" paddingRight="2.1875rem">전송</YellowButton>
      </FormBox>
    </>
  )
}

const FormBox = styled.form`
  width: 49.375rem;
  margin: auto auto;
  margin-top: 11.25rem;
  position: relative;
`;

const PageTitle = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 1.625rem;
  color: #343434;
  padding-bottom: 0.375rem;
  border-bottom: solid 3px #343434;
`;

const GuideMessage = styled.p`
  display: block;
  color: #8D8C85;
  font-size: 1.125rem;
  font-family: "Pretendard-Medium";
  border-top: solid 2px #E5E5E5;
  margin-top: 95px;
  padding-top: 20px;
  margin-bottom: 40px;
`;

export {FormBox, PageTitle, GuideMessage};
export default findPassword;
