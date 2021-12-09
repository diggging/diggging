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
import SvgDigggingLogo from '../public/static/images/digggingLogo';

const BannerBackground = styled.div`
  width:100%;
  height: 32.5rem;

  background: linear-gradient(-10deg, #FBD362, #FABE56);
`;

const SubTitle = styled.h2`
  color: white;
  font-family: 'Pretendard-Bold';
  font-size: 1.75rem;
  display: inline-block;
  background-color: #FFBA42;
  margin-bottom: 1.2rem;
`;

const ServiceIntro = styled.p`
  color: #343434;
  font-family: 'Pretendard-Medium';
  font-size: 1.5rem;
  line-height: 2.125rem;
  margin-top: 0.875rem;
`;

const ImageContainer = styled.div`
  position: relative;
  /* width: 100%; */
  height: 33.125rem;
  width: 100%;
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
      <BannerBackground>
        <SubTitle>개발자들을 위한 커뮤니티,</SubTitle>
        <SvgDigggingLogo />
        <Image src="/../public/static/images/main_banner_icon.png" width={692} height={371} quality={96}/>
        <ServiceIntro>
          질문하고 기록하는 습관은 누구든 성장하게 해줍니다<br />
          개발도중 겪는 시행착오들을 디깅에 기록하고, 공유해보세요!<br />
          실력있는 개발자들이 함께할 거에요.
        </ServiceIntro>
      </BannerBackground>
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
