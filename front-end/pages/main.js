import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';
import Link from 'next/link'
import NavBar from "../components/NavBar";
import Image from 'next/image';
import {useSelector, useDispatch} from 'react-redux';
import QuestionList from '../components/QuestionList';
import Paging from '../components/Paging';


const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 31.9375rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* margin-top: 511px; */
  padding: 6.125rem 12.5rem;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 70px;
  border-top: 2px solid rgba(219, 214, 199, 0.4);
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const Tab = styled.div`
  width: 120px;
  height: 53px;
  color: #898A90;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 28.96px;
  margin-right: 30px;

  &:hover {
    color: black
  }
`;

const QuestionsContainer = styled.div`
  width: 100%;
  height: 100%;
`;



function main() {
  const [questions, setQuestions] = useState([]);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const QuestionRecent = async () => {
    try {
      //test url
      const res = await axios.get("https://jsonplaceholder.typicode.com/users")
      setQuestions(res.data)
    } catch(e) {
      console.log(e)
    }
  }
  //redux로 상태관리를 해줘야 할거 같다.
  const one = async () => {
    try {
      //test url
      setQuestions([]);
      const res = await axios.get("https://jsonplaceholder.typicode.com/users")
      setQuestions(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  const two = async () => {
    try {
      //test url
      const res = await axios.get("https://jsonplaceholder.typicode.com/comments")
      setQuestions(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  const three = async () => {
    try {
      //test url
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
      setQuestions(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    QuestionRecent();
  }, [])
  
  return (
        <div>
          <NavBar />
          <ImageContainer >
            <Image src="/../public/static/images/main.jpeg" layout="fill" />
          </ImageContainer>
          <Container>
            <TabContainer>
            {isAuthenticated ? (
              <>
                <Tab onClick={one}>최신 질문 순</Tab>
                <Tab onClick={two}>인기 순</Tab>
                <Tab onClick={three}>내가 남긴 질문</Tab>
              </>
            ) : (
              <>
                <Tab onClick={one}>최신 질문 순</Tab>
                <Tab onClick={two}>인기 순</Tab>
              </>
            )}
            </TabContainer>
            <QuestionsContainer >
              <QuestionList questions={questions}/>
              <Paging></Paging>
            </QuestionsContainer>
          </Container>
        </div>
    );
}

export default main;