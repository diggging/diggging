import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { check_auth_status } from "../../../redux/actions/auth";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import axios from "axios";
import {API_URL} from '../../../config/index';

function update() {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [folder, setFolder] = useState([]);
  const [tags, setTags] = useState([]);
  const [token, setToken] = useState("");
  const [desc, setDesc] = useState("");

  const onChangeTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [title]
  );

  const onChangeTags = useCallback(
    (e) => {
      setTags(e.target.value.split(","));
    },
    [tags]
  );

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

  const fetchData = async () => {
    try {
      await axios
        .get(`${API_URL}/questions/${id}/detail/`)
        .then((res) => {
          setTitle(res.data.title);
          setTags(res.data.question_tags);
          setDesc(res.data.desc);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const ToastUpdate = dynamic(
    () => import("../../../components/questions/ToastUiUpdate"),
    { ssr: false }
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
                <QuestionTitle
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                  placeholder="제목을 입력하세요."
                />
                {/* <QuestionFolder
              name="question_folder"
              onChange={onChangeFolder}
            >
              <option disabled defaultValue>
                🗂 게시글을 담을 폴더를 선택하세요!
              </option>
            </QuestionFolder> */}
                <QuestionHash
                  name="question_tags"
                  value={tags}
                  onChange={onChangeTags}
                  placeholder="#해시태그를 #입력해보세요"
                />
                <ToastUpdate
                  id={id}
                  title={title}
                  desc={desc}
                  tags={tags}
                  token={token}
                />
              </FormContainer>
            </Container>
          </MainContainer>
        </>
      ) : null}
    </div>
  );
}

export default React.memo(update);

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

const QuestionTitle = styled.input`
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

const QuestionFolder = styled.select`
  width: 51.375rem;
  height: 4.375rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #f5f5f7;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  padding: 0.625rem 1.25rem;
  font-size: 1.25rem;

  &:focus {
    outline: 0;
  }
`;

const QuestionHash = styled.input`
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


