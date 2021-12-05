import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import QuestionList from "../components/QuestionList";
import Paging from "../components/Paging";
import Layout from '../hocs/Layout'; 


const ImageContainer = styled.div`
  position: relative;
  /* width: 100%; */
  height: 31.9375rem;
  display: flex;
  justify-content: center;
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
  color: #898a90;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 28.96px;
  margin-right: 30px;

  &:hover {
    color: black;
  }
`;

const QuestionsContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function main() {
  const [questions, setQuestions] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const [page, setPage] = useState(1);

  // const handlePageChange = (pageNumber) => {
  //   axios
  //     .get(
  //       `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=20`
  //     )
  //   setPage(pageNumber);
  //   console.log(page);
  // };

  const QuestionRecent = async () => {
    try {
      //test url
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10");
      setQuestions(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //redux로 상태관리를 해줘야 할거 같다.
  const one = async () => {
    try {
      //test url
      setQuestions([]);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_page=2&_limit=10");
      setQuestions(res.data);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const two = async () => {
    try {
      //test url
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_page=3&_limit=10"
      );
      setQuestions(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const three = async () => {
    try {
      //test url
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_page=4&_limit=10");
      setQuestions(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    QuestionRecent();
  }, []);

  return (
    <Layout>
      <NavBar />
      <ImageContainer>
        <Image src="/../public/static/images/a.png" width={1440} height={511} />
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
        <QuestionsContainer>
          <QuestionList />
          {/* <Paging handlePageChange={handlePageChange} page={page}/> */}
        </QuestionsContainer>
      </Container>
    </Layout>
  );
}

export default main;
