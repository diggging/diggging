import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components';
import { check_auth_status, load_user } from "../../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Loader from 'react-loader-spinner';

function answerCreate() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const user = useSelector((state) => state.auth.user);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, [title]);

  const getAccessToken = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(check_auth_status())
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.access;
          setToken(accessToken);
        })
        .catch((err) => console.log(err));
    }
  };

  const ToastCreate = dynamic(() => import("../../../components/answer/ToastAnswerCreate"), { ssr: false, loading: () => <Loader type="ThreeDots" color="#FFE59C" width={100} height={100}/> });

  //token 확인(refresh, verify)
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(check_auth_status());
      getAccessToken();
  }, [dispatch]);

  return (
    <div>
      <MainContainer>
        <Container>
          <FormContainer>
            <AnswerTitle
              name="title"
              onChange={onChangeTitle}
              placeholder="제목을 입력하세요."
            />
            <ToastCreate
              title={title}
              token={token}
              id={id}
            />  
          </FormContainer>
        </Container>
      </MainContainer>
    </div>
  );
}

export default React.memo(answerCreate);

const MainContainer = styled.div`
  margin-top: 9.0625rem;
  margin-bottom: 4.375rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fafaff;
  box-sizing: border-box;
  /* box-shadow: 0.75rem 0.75rem 3.75rem 0.5rem rgba(0, 0, 0, 0.2); */
  width: 100%;
  margin: auto;
  padding: 2.625rem;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AnswerTitle = styled.input`
  width: 58.75rem;
  height: 4.375rem;
  margin-bottom: 1.5rem;
  background-color: #f5f5f7;
  border: none;
  border-radius: 0.3125rem;
  padding: 0.625rem 1.25rem;
  font-size: 1.25rem;

  &:focus {
    outline: 0;
  }
`;