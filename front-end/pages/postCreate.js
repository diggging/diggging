import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TextEditor from '../components/TextEditor';

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
  box-shadow: 0.75rem 0.75rem 3.75rem 0.5rem rgba(0, 0, 0, 0.2);
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

const ThumbnailArea = styled.input`
  width: 51.0625rem;
  height: 25rem;
  background-color: #F5F5F7;
  border: none;
  cursor: pointer;
  /* display: none; */
`;

const PostTitle = styled.input`
  width: 51.0625rem;
  height: 4.375rem;
  margin-top: 1.5rem;
  background-color: #F5F5F7;
  border: none;

  &:focus {
    outline: 0;
  }
`;

const PostFolder = styled.select`
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

const RadioContainer = styled.div`
  width: 51.0625rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 1.5rem;
`;

const RadioBtn = styled.input`
  margin-right: 0.75rem;
  margin-left: 0.75rem;
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

function postCreate() {
  const [thumbNail, setThumbNail] = useState(null);
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState([]);
  const [text, setText] = useState('');
  const [select, setSelect] = useState('전체공개');

  const [testDate, setTestData] = useState([]);
  
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeFolder = (e) => {
    setFolder(e.target.value);
  }

  const handleThumbNailChange = (e) => {
    setThumbNail(e.target.files[0]);
    formData.append("", setThumbNail, setThumbNail.name);
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  }
  //폴더 정보
  const Test = async () => {
    await axios.get('http://127.0.0.1:8000/posts/create/')
    .then((res) => setTestData(res.data));
  }

  useEffect(() => {
    Test();
  }, []);

  const handlePostCreate = async () => {
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
  console.log(setTitle)
  return (
      <div>
        <MainContainer>
          <Container>
            <FormContainer>
              <ThumbnailArea type="file" accept="image/*" placeholder="🎨 썸네일 이미지를 등록해보세요" onChange={handleThumbNailChange}/>
              <PostTitle onChange={onChangeTitle} placeholder="제목을 입력하세요."/>
              <PostFolder onChangeFolder={onChangeFolder}>
                <option disabled selected>🗂 게시글을 담을 폴더를 선택하세요!</option>
              </PostFolder>
              <TextEditor setText={setText}/>
              <RadioContainer>
                <RadioBtn id="전체 공개" value="전체 공개" type="radio" checked={select === "전체 공개"} onChange={handleSelect}/>전체 공개
                <RadioBtn id="이웃 공개" value="이웃 공개" type="radio" checked={select === "이웃 공개"} onChange={handleSelect}/>이웃 공개
                <RadioBtn id="비공개" value="비공개" type="radio" checked={select === "비공개"} onChange={handleSelect}/>비공개
              </RadioContainer>
              <BtnContainer>
                <Btn onClick={handlePostCreate}>작성하기</Btn>
                <Btn >나가기</Btn>
              </BtnContainer>
            </FormContainer>
          </Container>
        </MainContainer>
      </div>
  );
}

export default postCreate;