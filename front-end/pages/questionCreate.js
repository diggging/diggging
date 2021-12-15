import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { check_auth_status, load_user } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

function questionCreate() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [title, setTitle] = useState("");
  const [folder, setFolder] = useState([]);
  const [tags, setTags] = useState([]);
  const [token, setToken] = useState("");

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, [title]);

  const onChangeFolder = useCallback((e) => {
    setFolder([e.target.value]);
  }, [folder]);

  const onChangeTags = useCallback((e) => {
    setTags(e.target.value.split(','));
  }, [tags]);

  const onLoadUser = async () => {
    const response = dispatch(load_user());
    if (user) {
      const userData = user.user;
      const { email, user_nickname, username } = userData;
      console.log(user.user);
      console.log(response, "response");
    } else {
      console.log("유저없엉");
    }
  };

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

  const Toast = dynamic(() => import("../components/questions/ToastUi"), { ssr: false });

  //token 확인(refresh, verify)
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(check_auth_status());
  }, [dispatch]);

  useEffect(() => {
    getAccessToken();
    onLoadUser();
  }, []);

  console.log(tags);
  return (
    <div>
      <MainContainer>
        <Container>
          <FormContainer>
            <QuestionTitle
              name="title"
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
              onChange={onChangeTags}
              placeholder="#해시태그를 #입력해보세요"
            />
            <Toast
              title={title}
              folder={folder}
              tags={tags}
              token={token}
            />
          </FormContainer>
        </Container>
      </MainContainer>
    </div>
  );
}

export default React.memo(questionCreate);

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
  width: 51.375rem;
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
  width: 51.375rem;
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

const BtnContainer = styled.div`
  width: 21.875rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1.5rem;
`;

const Btn = styled.button`
  width: 8.75rem;
  height: 3rem;
  background-color: #f5f5f7;
  /* border: 3px solid #FFFFFF; */
  /* border: none; */
  box-sizing: border-box;
  border-radius: 1.5625rem;
  cursor: pointer;
`;