import React, { useState } from "react";
import styled from "styled-components";
import SvgDiggging from "../public/static/images/Diggging";

function signup() {
  //여러 개의 인풋 관리를 위해서 inputs state만들었음
  const [inputs, setInputs] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  //비구조화할당으로 inputs에서 값 가져오기
  const { username, nickname, email, password, passwordCheck } = inputs;

  const onInput = (e) => {
    const { value, name } = e.target; //e.target에서 value와 name추출
    setInputs({
      ...inputs, //기존의 inputs 복사한 뒤
      [name]: value, //name에 해당하는 값을 key로하고 가져온 value를 설정
    });
  };

  const onReset = () => {
    setInputs({
      username: "",
      nickname: "",
      email: "",
      password: "",
      passwordCheck: "",
    });
  };

  return (
    <BackgroundColor>
      <SignupBox>
        <SvgDiggging width="77" height="23" />
        <GuideMessage>
          실력있는 개발자들에게 질문하고 매일매일 성장하세요
        </GuideMessage>
        <form>
          <SignupInput
            name="username"
            value={username}
            onChange={onInput}
            placeholder="사용할 아이디"
            type="text"
          />
          <SignupInput
            name="nickname"
            value={nickname}
            onChange={onInput}
            placeholder="사용할 닉네임"
            type="text"
          />
          <SignupInput
            name="email"
            value={email}
            onChange={onInput}
            placeholder="이메일"
            type="text"
          />
          <SignupInput
            name="password"
            value={password}
            onChange={onInput}
            placeholder="비밀번호"
            type="text"
          />
          <SignupInput
            name="passwordCheck"
            value={passwordCheck}
            onChange={onInput}
            placeholder="비밀번호확인"
            type="text"
          />
          <SignupBtn>회원가입하기</SignupBtn>
        </form>
        <LinkBtn> 로그인 </LinkBtn> | <LinkBtn>비밀번호 찾기</LinkBtn>
        <Button>네이버 로그인</Button>
        <Button>깃헙 로그인</Button>
        {username} {nickname} {email} {password} {passwordCheck}
      </SignupBox>
    </BackgroundColor>
  );
}

export default signup;

const BackgroundColor = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffd358;
  color: grey;
`;

const SignupBox = styled.div`
  background-color: white;
  box-shadow: 10px 10px 35px 0 rgb(1 1 1 / 10%);
  border-radius: 20px;
  width: 480px;
  height: auto;
  padding: 40px 50px;
  display: block;
`;

const Logo = styled.a`
  border: none;
  outline: none;
  background-color: none;
  text-align: center;
`;

const GuideMessage = styled.p`
  color: #848484;
  font-size: 12px;
  font-family: "Pretendard-Regular";
`;

const SignupInput = styled.input`
  background-color: #f7f7f7;
  padding: 16px 14px;
  width: 380px;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-top: 14px;
  color: #c4c4c4;
`;

const SignupBtn = styled.button`
  background-color: #ffd358;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  text-align: center;
  margin-top: 22px;
`;

const LinkBtn = styled.a`
  color: #c4c4c4;
  font-size: 14px;
  text-decoration: none;
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 20px;
  color: #5f5f5f;

  box-shadow: 0, 4, 12, rgba(1, 1, 1, 10%);
  border: none;
`;
