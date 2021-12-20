import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {API_URL} from '../../../../config/index'
import Layout from '../../../../hocs/Layout';
import styled from 'styled-components';
import NavBar from '../../../../components/NavBar';
import GreyInput from '../../../../components/common/GreyInput';
import YellowButton from "../../../../components/common/YellowButton";
import YellowTitle from '../../../../components/common/YellowTitle';
import { useRouter } from 'next/router';
import { FormBox, GuideMessage, PageTitle } from '../../../findPassword';
import FlexColumn from '../../../../components/common/FlexColumn';
import { reset_password_confirm } from '../../../../redux/actions/auth';
import { useDispatch } from 'react-redux';

function ResetPassword({match, reset_password_confirm}) {
  const router = useRouter();
  console.log(router.query.page);
  const dispatch = useDispatch();
  const [requestSent, setRequestSent] = useState(false)
  const [inputs, setInputs] = useState({
    newPW: '',
    confirmPW: '',
  });
  
  // const uid = match.params.uid64;
  // const token = match.params.token;
  // const userId = match.params.user.id

  const {newPW, confirmPW} = inputs;

  const onInput = (e) => {
    const {name, value} = e.target;
    setInputs({
      [name]: value,
    })
  }

  const onUpdatePassword = (e) => {
    e.preventDefault();
   

    console.log(uid64)
    console.log(token)
    console.log(userId)

    console.log('햐햐핳')


    dispatch(reset_password_confirm(newPW, confirmPW))
    .then((res) => alertService.warn(res))
    .catch((err) => alertService.warn(err))
    setRequestSent(true)
  }
  return (
    <>
      <Layout />
      <NavBar />
      <FormBox>
        <PageTitle>비밀번호 변경하기 </PageTitle>
        <GuideMessage>새 비밀번호를 입력하시면 비밀번호가 변경됩니다.</GuideMessage>
        <PasswordForm onSubmit={(e) => onUpdatePassword(e)} type="POST">
          <FlexColumn>
            <StyledFlexRow>
              <YellowTitle fontSize="1.375rem">비밀번호</YellowTitle>
              <GreyInput
                width="21.5625rem"
                height="3.125rem"
                marginRight="2.875rem"
                marginLeft="2.75rem"
                type="password"
                name="newPW"
                placeholder="새 비밀번호"
                onChange={onInput}
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
                name="confirmPW"
                placeholder="비밀번호 확인"
                onChange={onInput}
                required
              />
          </StyledFlexRow>
          </FlexColumn>
          <YellowButton type="submit" paddingTop="0.9375rem" paddingRight="2.1875rem" >전송</YellowButton>
        </PasswordForm>
      </FormBox>
    </>
  )
}

const StyledFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.5rem;
`;


const PasswordForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
export default ResetPassword;
