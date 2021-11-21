import React, {useState} from 'react'
import {UserInput} from '../signup';
import axios from 'axios';
import {API_URL} from '../../config/index';
import Layout from '../../hocs/Layout';
import styled from 'styled-components';

function findPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const onInput = (e) => {
    setEmail(e.target.value);
  }

  const findPassword = async (e, email) => {
    e.preventDefault();
    await axios.post(`http://localhost:3000/users/api/password_reset_done`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Max-Age': 3600,
        'Access-Control-Allow-Headers': origin,
      },
      credentials: "include",
      email: email
    })
    .then(response => {
      setMessage("입력하신 이메일주소로 비밀번호 변경 링크를 보내드렸습니다.")
    })
    .catch(error => setMessage(`${error} 이메일 발송중 오류가 발생했습니다.`))
  }
  return (
    <>
      <Layout/>
      <FormBox>
        <PageTitle>비밀번호 찾기</PageTitle>
        가입하신 이메일을 입력하시면 해당 주소로 비밀번호 변경 링크를 보내드립니다.
        <form onSubmit={findPassword} type="POST">
        <iframe name="iframe"></iframe>
        <UserInput
          type="email"
          name="email"
          placeholder="이메일"
          onChange={onInput}
          value={email}
          required
        />
        <button>전송</button>
        </form>
      </FormBox>
    </>
  )
}

export default findPassword;
const FormBox = styled.section`
  width: 49.375rem;
  margin: auto auto;
  margin-top: 11.25rem;
`;

const PageTitle = styled.h1`
  display: inline-block;
  font-family: 'Pretendard-Bold';
  font-size: 1.625rem;
  color: #343434;
  padding-bottom: 0.375rem;
  border-bottom: solid 3px #343434;
`;

const GuideMessage = styled.p`
  color: #8D8C85;
  font-size: 1.125rem;
  font-family: "Pretendard-Medium";
  border-top: solid 2px #E5E5E5;

`;
