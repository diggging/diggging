import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TextEditor from '../components/TextEditor';
import Layout from '../hocs/Layout'; 


const MainContainer = styled.div`
  margin-top: 9.0625rem;
  margin-bottom: 4.375rem;
`;

const Container = styled.div`
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF;
  box-sizing: border-box;
  /* box-shadow: 0.75rem 0.75rem 3.75rem 0.5rem rgba(0, 0, 0, 0.2); */
  width: 59.375rem;
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
  width: 51.0625rem;
  height: 4.375rem;
  margin-top: 1.5rem;
  background-color: #F5F5F7;
  border: none;

  &:focus {
    outline: 0;
  }
`;

const QuestionFolder = styled.select`
  width: 51.0625rem;
  height: 4.375rem;
  margin-top: 1.5rem;
  background-color: #F5F5F7;
  border: none;
  cursor: pointer;
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
  border: 0.1875rem solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 1.5625rem;
  cursor: pointer;
`;

function questionCreate() {
  const [thumbNail, setThumbNail] = useState(null);
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState([]);
  const [text, setText] = useState('');
  
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeFolder = (e) => {
    setFolder(e.target.value);
  }

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("", thumbNail);
    // formData.append("", setTitle, setTitle.name);
    // formData.append("", setFolder, setFolder.name);
    // formData.append("", setText, setText.name);
    try {
      await axios.post('http://127.0.0.1:8000/posts/create/', {
        user : 1,
        image: formData,
        title : title,
        folder : '폴더',
        desc : "테스트",
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
  
  return (
      <div>
        <Layout />
        <MainContainer>
          <Container>
            <FormContainer>
              {/* <ThumbnailArea type="file" accept="image/*" placeholder="🎨 썸네일 이미지를 등록해보세요" onChange={handleThumbNailChange}/> */}
              <QuestionTitle onChange={onChangeTitle} placeholder="제목을 입력하세요."/>
              <QuestionFolder onChangeFolder={onChangeFolder}>
                <option disabled selected>🗂 게시글을 담을 폴더를 선택하세요!</option>
              </QuestionFolder>
              <TextEditor setText={setText}/>
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