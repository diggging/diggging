import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { check_auth_status } from "../../../redux/actions/auth";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import axios from "axios";
import {API_URL} from '../../../config/index';
import Loader from 'react-loader-spinner';

function answerUpdate() {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");
  const [desc, setDesc] = useState("");
  const [questionId, setQuestionId] = useState("");

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

  const onChangeTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [title]
  );

  const fetchData = async () => {
    try {
      await axios
        .get(`${API_URL}/questions/${id}/answer_detail/`)
        .then((res) => {
          setQuestionId(res.data.question);
          setTitle(res.data.title);
          setDesc(res.data.desc);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const ToastUpdate = dynamic(
    () => import("../../../components/answer/ToastAnswerUpdate"),
    { ssr: false,
      loading: () => <Loader type="ThreeDots" color="#FFE59C" width={100} height={100}/> }
  );

  //token 확인(refresh, verify)
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(check_auth_status());
  }, [dispatch]);

  useEffect(() => {
    if(id && id > 0) {
      fetchData(); 
      getAccessToken();
    }
  }, [id]);

  return (
    <div>
      {id ? (
        <>
          <MainContainer>
            <Container>
              <FormContainer>
                <AnswerTitle
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                  placeholder="제목을 입력하세요."
                />
                <ToastUpdate
                  id={id}
                  title={title}
                  desc={desc}
                  token={token}
                  questionId={questionId}
                />
              </FormContainer>
            </Container>
          </MainContainer>
        </>
      ) : null}
    </div>
  );
}

export default React.memo(answerUpdate);

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



