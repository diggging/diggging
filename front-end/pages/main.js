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
      {/* <BannerBackground> */}
      <BannerBackground>
        <Image src="/../public/static/images/main_banner_back.png" quality={100} layout="fill" objectFit="cover"/>
        <SubTitle>개발자들을 위한 커뮤니티,</SubTitle>
        <SvgDigggingLogo display='block'/>
        <ServiceTitle>디깅에 기록하고, 질문하고, 공유하세요</ServiceTitle>
        <ServiceIntro>
          질문하고 기록하는 습관은 누구든 성장하게 해줍니다<br />
          개발도중 겪는 시행착오들을 디깅에 기록하고, 공유해보세요!<br />
          실력있는 개발자들이 함께할 거에요.
        </ServiceIntro>
      </BannerBackground>
      {/* </BannerBackground> */}
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

const BannerBackground = styled.div`
  width: 100%;
  height: 32.5rem;
  position: relative;
  padding: 4rem 6rem;
  & img {
    z-index: -2;
  }

  @media ${({ theme: { device } }) => device.laptop} {
    padding: 4rem 6rem;
  }
  @media ${({ theme: { device } }) => device.tablet} {
    padding: 4rem 5rem;
  }
  @media ${({ theme: { device } }) => device.mobile} {
    padding: 4rem 3rem;
  }

  
`;


const SubTitle = styled.h2`
  margin-top: 2.5rem;
  color: white;
  font-family: 'Pretendard-Bold';
  font-size: 1.75rem;
  display: inline-block;
  background-color: #FFBA42;
  margin-bottom: 1rem;
  padding: 0.1rem 0.6rem;
  border-radius: 0.4rem;

  @media ${({ theme: { device } }) => device.tablet} {
    font-size: 1.5rem
  }
  @media ${({ theme: { device } }) => device.mobile} {
    font-size: 1.3rem;
  }
`;

const ServiceTitle = styled.h3`
  color: #343434;
  font-family: 'Pretendard-Bold';
  font-size: 1.75rem;
  letter-spacing: -4;
  margin-top: 3rem;
  @media ${({ theme: { device } }) => device.tablet} {
    font-size: 1.5rem;
    margin-top:2.3rem;
  }
  @media ${({ theme: { device } }) => device.mobile} {
    font-size: 1.3rem;
    margin-top: 1.6rem;
  }
`;

const ServiceIntro = styled.p`
  color: #343434;
  font-family: 'Pretendard-Medium';
  font-size: 1.5rem;
  line-height: 2.2rem;
  margin-top: 0.875rem;
  @media ${({ theme: { device } }) => device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme: { device } }) => device.mobile} {
    font-size: 1.2rem;
    margin-top: 0.2rem;
    line-height: 1.8rem;
  }
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
