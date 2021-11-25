import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { login, reset_register_success, reset_bad_request } from '../redux/actions/auth';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import Layout from '../hocs/Layout'; 
import { UserInput, LinkBtn, LinkBox, VerifyMessage } from './signup';
import { Alert } from '../components/Alert';
import { alertService } from '../components/alert.service';

const BackgroundColor = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top:0;
  left:0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffd358;
  color: grey;
`;

const LoginBox = styled.div`
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
  display: inherit;
`;

const GuideMessage = styled.p`
  color: #848484;
  font-size: 12px;
  font-family: 'Pretendard-Regular';
  text-align: center;
  margin-bottom: 30px;
`;

const LoginInput = styled.input`
  background-color: #f7f7f7;
  padding: 16px 14px;
  width: 380px;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-top: 14px;
  color: #8d8c85;
`;

const LoginBtn = styled.button`
  background-color: #ffd358;
  border-radius: 8px;
  color: white;
  box-shadow: none;
  border: none;

  padding: 14px;
  margin-top: 22px;
  margin-bottom: 28px;
  width: 100%;

  font-size: 20px;
  text-align: center;
  font-family: 'Pretendard-SemiBold';

  cursor: pointer;

  &:hover {
    background-color: #ffd664;
    box-shadow: 0, 4, 12, rgba(1, 1, 1, 8%);
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 20px;
  color: #5f5f5f;

  box-shadow: 0, 4, 12, rgba(1, 1, 1, 10%);
  border: none;
`;

function loginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const bad_request = useSelector((state) => state.auth.bad_request);

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({
    usernameError: '',
    passwordError: '',
    loginError: ''
  });
  const {usernameError, passwordError, loginError} = error;
  const { username, password } = inputs;

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(reset_register_success());
      dispatch(reset_bad_request());
    }
  }, [dispatch]);

  const onInput = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
    
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    switch (e.target.name) {
      case "username":
        if (e.target.value.length < 4) {
          setError({
            ...error,
            usernameError: "아이디를 4자 이상 입력해주세요."
          })
        } else {
            setError({
              ...error,
              usernameError: "올바른 아이디 형식입니다. 😏"
            })
          }
        break;
      case "password":
        if (e.target.value.length < 8) {
          setError({
            ...error,
            passwordError: "비밀번호를 8자 이상 입력하세요."
          })
         } else {
            setError({
              ...error,
              passwordError: "올바른 비밀번호 형식입니다😏"
            })
          }
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(login(username, password));
       //router가 있는지, authenticated한지 확인하고
      if (typeof window !== 'undefined' && isAuthenticated === true) {
        alertService.warn('로그인되었습니다🙂');
        //Redirect to main
        router.push(`/`);
      }
    };
    //아이디-비밀번호 일치하지 않으면 에러메시지
    if (typeof window !== 'undefined' && bad_request === true) {
      setError({
        ...error,
        loginError: '아이디와 비밀번호를 확인해주세요.'
      })
      alertService.warn('아이디와 비밀번호를 확인해주세요.🙂');
    } else if (typeof window !== 'undefined' && isAuthenticated === false && loading == false) {
      setError({
        ...error,
        loginError: '서버에 오류가 생겼습니다🙁'
      })
    }
    //하나라도 입력 안한 것 있으면 에러메시지
    if (username === '' || password === '') {
      setError(
        {
          ...error,
          loginError: '아이디와 비밀번호 모두 입력해주세요.'
        })
        return;
    }
    
  }

 

  return (
    <Layout
      title='Diggging | 로그인'
      content='개발자들을 위한 커뮤니티 디깅 로그인 페이지'  
    >
      <BackgroundColor>
        <LoginBox>
        <Alert />
          <Logo>
            <svg
              width="131"
              height="37"
              viewBox="0 0 77 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33209 17.22C3.89476 17.22 2.75809 16.6993 1.92209 15.658C1.10076 14.602 0.690092 13.1573 0.690092 11.324C0.690092 10.2093 0.880759 9.234 1.26209 8.398C1.64343 7.562 2.18609 6.91667 2.89009 6.462C3.60876 6.00733 4.44476 5.78 5.39809 5.78C6.04343 5.78 6.60809 5.89 7.09209 6.11C7.59076 6.33 8.02343 6.66733 8.39009 7.122H8.43409V0.675999H11.2281V14.074C11.2281 15.5993 11.2501 16.5747 11.2941 17H8.65409C8.63943 16.7507 8.63209 16.2667 8.63209 15.548H8.58809C8.25076 16.0467 7.78143 16.45 7.18009 16.758C6.59343 17.066 5.97743 17.22 5.33209 17.22ZM5.88209 15.064C6.65943 15.064 7.27543 14.844 7.73009 14.404C8.19943 13.9493 8.43409 13.3553 8.43409 12.622V10.356C8.43409 9.63733 8.19209 9.04333 7.70809 8.574C7.22409 8.10467 6.61543 7.87 5.88209 7.87C5.10476 7.87 4.51076 8.17067 4.10009 8.772C3.68943 9.37333 3.48409 10.2387 3.48409 11.368C3.48409 12.556 3.68943 13.4727 4.10009 14.118C4.51076 14.7487 5.10476 15.064 5.88209 15.064ZM14.2557 4.724C13.713 4.724 13.2803 4.57733 12.9577 4.284C12.635 3.976 12.4737 3.57267 12.4737 3.074C12.4737 2.57533 12.635 2.17933 12.9577 1.886C13.2803 1.578 13.713 1.424 14.2557 1.424C14.7983 1.424 15.231 1.578 15.5537 1.886C15.891 2.17933 16.0597 2.57533 16.0597 3.074C16.0597 3.57267 15.8983 3.976 15.5757 4.284C15.253 4.57733 14.813 4.724 14.2557 4.724ZM12.8697 6H15.6637V17H12.8697V6ZM27.3113 6V16.56C27.3113 18.4227 26.8493 19.8233 25.9253 20.762C25.0013 21.7153 23.63 22.192 21.8113 22.192C20.9606 22.192 20.154 22.0893 19.3913 21.884C18.6433 21.6787 17.976 21.3853 17.3893 21.004L18.3353 19.09C18.8633 19.354 19.4206 19.5593 20.0073 19.706C20.594 19.8673 21.1513 19.948 21.6793 19.948C22.6766 19.948 23.4173 19.6327 23.9013 19.002C24.3853 18.386 24.6273 17.4473 24.6273 16.186V15.834C24.334 16.23 23.9306 16.538 23.4173 16.758C22.904 16.9633 22.2953 17.066 21.5913 17.066C20.066 17.066 18.878 16.5673 18.0273 15.57C17.1913 14.5727 16.7733 13.1647 16.7733 11.346C16.7733 9.586 17.1766 8.222 17.9833 7.254C18.79 6.27133 19.9266 5.78 21.3933 5.78C22.9186 5.78 24.026 6.31533 24.7153 7.386H24.7593L24.9793 6H27.3113ZM24.5173 10.818C24.5173 9.86467 24.312 9.13867 23.9013 8.64C23.4906 8.12667 22.8966 7.87 22.1193 7.87C21.298 7.87 20.6673 8.178 20.2273 8.794C19.7873 9.39533 19.5673 10.268 19.5673 11.412C19.5673 12.556 19.78 13.4213 20.2053 14.008C20.6453 14.5947 21.2833 14.888 22.1193 14.888C22.8966 14.888 23.4906 14.6607 23.9013 14.206C24.312 13.7367 24.5173 13.0767 24.5173 12.226V10.818ZM38.4144 6V16.56C38.4144 18.4227 37.9524 19.8233 37.0284 20.762C36.1044 21.7153 34.7331 22.192 32.9144 22.192C32.0638 22.192 31.2571 22.0893 30.4944 21.884C29.7464 21.6787 29.0791 21.3853 28.4924 21.004L29.4384 19.09C29.9664 19.354 30.5238 19.5593 31.1104 19.706C31.6971 19.8673 32.2544 19.948 32.7824 19.948C33.7798 19.948 34.5204 19.6327 35.0044 19.002C35.4884 18.386 35.7304 17.4473 35.7304 16.186V15.834C35.4371 16.23 35.0338 16.538 34.5204 16.758C34.0071 16.9633 33.3984 17.066 32.6944 17.066C31.1691 17.066 29.9811 16.5673 29.1304 15.57C28.2944 14.5727 27.8764 13.1647 27.8764 11.346C27.8764 9.586 28.2798 8.222 29.0864 7.254C29.8931 6.27133 31.0298 5.78 32.4964 5.78C34.0218 5.78 35.1291 6.31533 35.8184 7.386H35.8624L36.0824 6H38.4144ZM35.6204 10.818C35.6204 9.86467 35.4151 9.13867 35.0044 8.64C34.5938 8.12667 33.9998 7.87 33.2224 7.87C32.4011 7.87 31.7704 8.178 31.3304 8.794C30.8904 9.39533 30.6704 10.268 30.6704 11.412C30.6704 12.556 30.8831 13.4213 31.3084 14.008C31.7484 14.5947 32.3864 14.888 33.2224 14.888C33.9998 14.888 34.5938 14.6607 35.0044 14.206C35.4151 13.7367 35.6204 13.0767 35.6204 12.226V10.818ZM49.5175 6V16.56C49.5175 18.4227 49.0555 19.8233 48.1315 20.762C47.2075 21.7153 45.8362 22.192 44.0175 22.192C43.1669 22.192 42.3602 22.0893 41.5975 21.884C40.8495 21.6787 40.1822 21.3853 39.5955 21.004L40.5415 19.09C41.0695 19.354 41.6269 19.5593 42.2135 19.706C42.8002 19.8673 43.3575 19.948 43.8855 19.948C44.8829 19.948 45.6235 19.6327 46.1075 19.002C46.5915 18.386 46.8335 17.4473 46.8335 16.186V15.834C46.5402 16.23 46.1369 16.538 45.6235 16.758C45.1102 16.9633 44.5015 17.066 43.7975 17.066C42.2722 17.066 41.0842 16.5673 40.2335 15.57C39.3975 14.5727 38.9795 13.1647 38.9795 11.346C38.9795 9.586 39.3829 8.222 40.1895 7.254C40.9962 6.27133 42.1329 5.78 43.5995 5.78C45.1249 5.78 46.2322 6.31533 46.9215 7.386H46.9655L47.1855 6H49.5175ZM46.7235 10.818C46.7235 9.86467 46.5182 9.13867 46.1075 8.64C45.6969 8.12667 45.1029 7.87 44.3255 7.87C43.5042 7.87 42.8735 8.178 42.4335 8.794C41.9935 9.39533 41.7735 10.268 41.7735 11.412C41.7735 12.556 41.9862 13.4213 42.4115 14.008C42.8515 14.5947 43.4895 14.888 44.3255 14.888C45.1029 14.888 45.6969 14.6607 46.1075 14.206C46.5182 13.7367 46.7235 13.0767 46.7235 12.226V10.818ZM52.4807 4.724C51.938 4.724 51.5053 4.57733 51.1827 4.284C50.86 3.976 50.6987 3.57267 50.6987 3.074C50.6987 2.57533 50.86 2.17933 51.1827 1.886C51.5053 1.578 51.938 1.424 52.4807 1.424C53.0233 1.424 53.456 1.578 53.7787 1.886C54.116 2.17933 54.2847 2.57533 54.2847 3.074C54.2847 3.57267 54.1233 3.976 53.8007 4.284C53.478 4.57733 53.038 4.724 52.4807 4.724ZM51.0947 6H53.8887V17H51.0947V6ZM55.4383 8.904C55.4383 7.56933 55.409 6.60133 55.3503 6H57.9903C58.0636 6.616 58.1003 7.254 58.1003 7.914H58.1663C58.4303 7.26867 58.8923 6.75533 59.5523 6.374C60.227 5.978 60.975 5.78 61.7963 5.78C63.0576 5.78 64.011 6.20533 64.6563 7.056C65.3016 7.90667 65.6243 9.16067 65.6243 10.818V17H62.8303V10.796C62.8303 9.84267 62.6763 9.146 62.3683 8.706C62.0603 8.266 61.569 8.046 60.8943 8.046C60.117 8.046 59.479 8.32467 58.9803 8.882C58.4963 9.42467 58.2543 10.1287 58.2543 10.994V17H55.4383V8.904ZM76.8328 6V16.56C76.8328 18.4227 76.3708 19.8233 75.4468 20.762C74.5228 21.7153 73.1514 22.192 71.3328 22.192C70.4821 22.192 69.6754 22.0893 68.9128 21.884C68.1648 21.6787 67.4974 21.3853 66.9108 21.004L67.8568 19.09C68.3848 19.354 68.9421 19.5593 69.5288 19.706C70.1154 19.8673 70.6728 19.948 71.2008 19.948C72.1981 19.948 72.9388 19.6327 73.4228 19.002C73.9068 18.386 74.1488 17.4473 74.1488 16.186V15.834C73.8554 16.23 73.4521 16.538 72.9388 16.758C72.4254 16.9633 71.8168 17.066 71.1128 17.066C69.5874 17.066 68.3994 16.5673 67.5488 15.57C66.7128 14.5727 66.2948 13.1647 66.2948 11.346C66.2948 9.586 66.6981 8.222 67.5048 7.254C68.3114 6.27133 69.4481 5.78 70.9148 5.78C72.4401 5.78 73.5474 6.31533 74.2368 7.386H74.2808L74.5008 6H76.8328ZM74.0388 10.818C74.0388 9.86467 73.8334 9.13867 73.4228 8.64C73.0121 8.12667 72.4181 7.87 71.6408 7.87C70.8194 7.87 70.1888 8.178 69.7488 8.794C69.3088 9.39533 69.0888 10.268 69.0888 11.412C69.0888 12.556 69.3014 13.4213 69.7268 14.008C70.1668 14.5947 70.8048 14.888 71.6408 14.888C72.4181 14.888 73.0121 14.6607 73.4228 14.206C73.8334 13.7367 74.0388 13.0767 74.0388 12.226V10.818Z"
                fill="#343434"
              />
            </svg>
          </Logo>
          <GuideMessage>
            실력있는 개발자들에게 질문하고 매일매일 성장하세요
          </GuideMessage>
          <form onSubmit={(e) => onSubmit(e)}>
            <UserInput
              type="text"
              placeholder="아이디"
              name="username"
              value={username}
              onChange={(e) => onInput(e)}
              required
            />
            <VerifyMessage>{usernameError}</VerifyMessage>
            <UserInput
              type="password"
              placeholder="비밀번호"
              name="password"
              value={password}
              onChange={(e) => onInput(e)}
              minLength="8"
              required
            />
            <VerifyMessage>{passwordError}</VerifyMessage>
            <LoginBtn type="submit">로그인</LoginBtn>
            <VerifyMessage>{loginError}</VerifyMessage>
            {loading ? (
              <div>
                <Loader type="Oval" color="#ffd664" width={30} height={30} />
              </div>
            ) : null}
          </form>
          <LinkBox>
            <Link href="/signup" passHref><LinkBtn>회원가입하기 | </LinkBtn></Link>
            <Link href="/user/findPassword" passHref><LinkBtn> 비밀번호 찾기</LinkBtn></Link>
          </LinkBox>
        </LoginBox> 
      </BackgroundColor>
    </Layout>
  );
}

export default loginPage;
