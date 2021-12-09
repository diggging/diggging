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
  const [thumbNail, setThumbNail] = useState(null);
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState([]);
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');
  const [token, setToken] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeFolder = (e) => {
    setFolder(e.target.value);
  }

  const onChangeContent = (e) => {
    setText(e);
  }

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
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      await axios.post('http://127.0.0.1:8000/questions/create/', {
        headers: {
          "Content-type": "application/json",
        },
        body: {
          "title" : "whdrnjs5",
          "desc": "http://127.0.0.1:8000/",
          "question_folder" : [3],
          "question_tags": ["#test"],
        }
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

  const onChangeHash = (e) => {
    setHash(e.target.value);
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
  
  return (
      <div>
        <MainContainer>
          <Container>
            <FormContainer>
              <QuestionTitle onChange={onChangeTitle} placeholder="제목을 입력하세요."/>
              <QuestionFolder onChangeFolder={onChangeFolder}>
                <option disabled selected >🗂 게시글을 담을 폴더를 선택하세요!</option>
              </QuestionFolder>
              <Toast setText={setText}/>
              <QuestionHash onChange={onChangeHash} placeholder="#해시태그를 #입력해보세요"/>

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