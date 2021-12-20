import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import Layout from '../hocs/Layout';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import GreyInput from '../components/common/GreyInput';
import YellowButton from "../components/common/YellowButton";
import YellowTitle from '../components/common/YellowTitle';
import { GuideMessage, PageTitle } from './findPassword';
import FlexColumn from '../components/common/FlexColumn';
import { useDispatch } from 'react-redux';
import { alertService } from '../components/alert.service';
import { Alert } from '../components/Alert';
import { reset_password_confirm } from '../redux/actions/auth';

function ResetPassword() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    new_password: '',
    password_confirm: '',
    username: '',
    temp: '',
  });
  
  
  const onInput = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
    console.log(new_password, password_confirm, username, temp, 'new_password password_confirm, username, temp')
  }
  
  const {new_password, password_confirm, username, temp} = inputs;
  
  const onUpdatePassword = (e) => {
    e.preventDefault();
    console.log('clicked');

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(reset_password_confirm(username, temp, new_password, password_confirm))
      .then((res) => alertService.warn(res))
      .catch((err) => alertService.warn(err))
    }
    console.log(username, temp, new_password, password_confirm, "username, temp, new_password, password_confirm")
  }

  return (
    <>
      <Layout />
      <NavBar />
      <Alert />
      <form onSubmit={(e) => onUpdatePassword(e)}>
        <PageTitle>비밀번호 변경하기 </PageTitle>
        <GuideMessage>새 비밀번호를 입력하시면 비밀번호가 변경됩니다.</GuideMessage>
        <FlexColumn>
          <StyledFlexRow>
            <YellowTitle fontSize="1.375rem">아이디</YellowTitle>
            <GreyInput
              width="21.5625rem"
              height="3.125rem"
              marginRight="2.875rem"
              marginLeft="2.75rem"
              name="username"
              placeholder="아이디"
              value={username}
              onChange={(e) => onInput(e)}
              required
            />
          </StyledFlexRow>
          <StyledFlexRow>
            <YellowTitle fontSize="1.375rem">인증번호</YellowTitle>
            <GreyInput
              width="21.5625rem"
              height="3.125rem"
              marginRight="2.875rem"
              marginLeft="2.75rem"
              name="temp"
              placeholder="인증번호 5자를 입력하세요"
              password={temp}
              onChange={(e) => onInput(e)}
              required
            />
          </StyledFlexRow>
          <StyledFlexRow>
            <YellowTitle fontSize="1.375rem">비밀번호</YellowTitle>
            <GreyInput
              width="21.5625rem"
              height="3.125rem"
              marginRight="2.875rem"
              marginLeft="2.75rem"
              type="password"
              name="new_password"
              placeholder="새 비밀번호"
              value={new_password}
              onChange={(e) => onInput(e)}
              required
            />
          </StyledFlexRow>
          <StyledFlexRow>
            <YellowTitle fontSize="1.375rem" >비밀번호 확인</YellowTitle>
            <GreyInput
              width="21.5625rem"
              height="3.125rem"
              marginRight="2.875rem"
              marginLeft="2.75rem"
              type="password"
              name="password_confirm"
              placeholder="비밀번호 확인"
              value={password_confirm}
              onChange={(e) => onInput(e)}
              required
            />
        </StyledFlexRow>
        </FlexColumn>
        <YellowButton type="submit" paddingTop="0.9375rem" paddingRight="2.1875rem" >전송</YellowButton>
      </form>
    </>
  )
}

const StyledFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

export default ResetPassword;
