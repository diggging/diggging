import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { check_auth_status } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';

const MainContainer = styled.div`
  margin-top: 9.0625rem;
  margin-bottom: 4.375rem;
`;

const Container = styled.div`
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #FAFAFF;
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
  margin-top: 1.5rem;
  background-color: #F5F5F7;
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
  background-color: #F5F5F7;
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
  margin-top: 1.5rem;
  background-color: #F5F5F7;
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
  background-color: #F5F5F7;
  /* border: 3px solid #FFFFFF; */
  /* border: none; */
  box-sizing: border-box;
  border-radius: 1.5625rem;
  cursor: pointer;
`;

function questionCreate() {
  const dispatch = useDispatch();
  const [inputs, setInput] = useState({
    title: "",
    desc: "",
    question_folder: [],
    question_tags: []
  })

  const {title, desc, question_folder, question_tags} = inputs;
  const [token, setToken] = useState('');

  const onChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInput({
      ...inputs,
      [name]: value
    });
  };


  const getAccessToken = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(check_auth_status())
      .then((res) => res.json())
      .then((data) => {
        const accessToken = data.access;
        setToken(accessToken);
      })
      .catch((err) => console.log(err))
      }
  }
  
  const handleCreate = async () => { 
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.headers.common['Content-Type'] = "application/json";
      await axios.post('http://127.0.0.1:8000/questions/create/', {
          "title": "whdrnjs3",
          "desc": "whdrnjs3_for_api_schema2ㅁㄴㅇㅎㄹㄴㅁㅎ",
          "question_folder": [],
          "question_tags": ["#api"]
      })
      .then(response => {
        console.log(response);
      })
      .catch (error => {
        console.log(error);
      })
    } catch (e) {
      console.log(e);
    }
  }

  const Toast = dynamic(() => import('../components/ToastUi'),
  { ssr : false }
  )

  //token 확인(refresh, verify)
  useEffect(()=>{
    if (dispatch && dispatch !== null && dispatch !== undefined)
        dispatch(check_auth_status());
  }, [dispatch])

  useEffect(() => {
    getAccessToken();
  }, [])
  console.log(inputs);

  return (
      <div>
        <MainContainer>
          <Container>
            <FormContainer>
              <QuestionTitle name="title" value={title} onChange={onChange} placeholder="제목을 입력하세요."/>
              <QuestionFolder name="question_folder" value={question_folder} onChangeFolder={onChange}>
                <option disabled selected >🗂 게시글을 담을 폴더를 선택하세요!</option>
              </QuestionFolder>
              <Toast onChange={onChange}/>
              
              <QuestionHash name="question_tags" value={question_tags} onChange={onChange} placeholder="#해시태그를 #입력해보세요"/>

              <BtnContainer>
                <Btn onClick={handleCreate}>작성하기</Btn>
                <Btn >나가기</Btn>
              </BtnContainer>
            </FormContainer>
          </Container>
        </MainContainer>
      </div>
  );
}

export default questionCreate;