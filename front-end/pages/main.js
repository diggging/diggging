import React, { useState, useEffect, useCallback, Children } from "react";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import QuestionList from "../components/questions/QuestionList";
import Paging from "../components/Paging";
import Layout from "../hocs/Layout";
import Router from "next/router";
import Recent from "./recent";
import { useRouter } from "next/router";
import {setMain} from '../modules/questions';

function main({children}) {
  const router = useRouter();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const count = useSelector((state) => state.data.count);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [open, setOpen] = useState(false);

  //url 파싱 정규식
  function getURLParams(url) {
    var result = {};
    url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { result[k] = decodeURIComponent(v); });
    return result
  }
  const API = "http://127.0.0.1:8000/questions/question_list/?big_criteria=recent&page=1&small_criteria=all";

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(setMain());
    }
  }, [dispatch]);
  
  return (
    <Layout>
      <NavBar />
      <ImageContainer>
        <Image src="/../public/static/images/a.png" width={1440} height={511} />
      </ImageContainer>
      <Container>
        {isAuthenticated ? (
          <>
            <Link href="/questionCreate" passHref>
              <CreateBtn>질문하기</CreateBtn>
            </Link>
          </>
        ) : null}
        <TabContainer>
          {isAuthenticated ? (
            <>
              <Link href="/recent">
                <Tab>최신 질문 순</Tab>
              </Link>
              <Link href="/popular">
                <Tab>인기 순</Tab>
              </Link>
              <Link href="/mine">
                <Tab>내가 남긴 질문</Tab>
              </Link>
            </>
          ) : (
            <>
              <Link href="/recent">
                <Tab>최신 질문 순</Tab>
              </Link>
              <Link href="/popular">
                <Tab>인기 순</Tab>
              </Link>
            </>
          )}
          {/* <ToggleContainer onClick={() => {setOpen(!open)}}>
            답변전체
          </ToggleContainer>
          {open ? (
                <DropBox>
                  <DropList>
                    <DropListItem>답변 대기 중</DropListItem>
                    <DropListItem>답변완료</DropListItem>
                    <DropListItem>답변전체</DropListItem>
                  </DropList>
                </DropBox>
          ) : null} */}
        </TabContainer>
        <QuestionsContainer>
          {router.pathname == "/" ? (
            <>
              <QuestionList data={data} count={count} />
            </>
          ) : (
            <>
              {children}
            </>
          )}
        </QuestionsContainer>
      </Container>
    </Layout>
  );
}

export default React.memo(main);

const ImageContainer = styled.div`
  position: relative;
  /* width: 100%; */
  height: 31.9375rem;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1440px;
  height: 100vh;
  margin: 0 auto;
`;

const CreateBtn = styled.button`
  width: 150px;
  height: 50px;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 4px 4px 8px rgba(170, 170, 170, 0.1);
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 32px;
  letter-spacing: 0.01em;
  color: #706969;
  float: right;
  margin: 24px 24px;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 70px;
  border-top: 2px solid rgba(219, 214, 199, 0.4);
  display: flex;
  /* align-items: center; */
  padding: 10px 20px;
  margin-top: 98px;
`;

const Tab = styled.div`
  width: 120px;
  height: 53px;
  color: #898a90;
  cursor: pointer;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  float: left;
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

// const ToggleContainer = styled.button`
//   width: 132px;
//   height: 40px;
//   background: #FFFFFF;
//   box-shadow: 4px 4px 8px rgba(170, 170, 170, 0.1);
//   border-radius: 0.625rem;
//   text-align: center;
//   padding: 0.3125rem;
//   border: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   color: #9faeb6;
//   /* position: relative; */
//   float: right;

//   & svg {
//     margin-left: 10px;
//   }
// `;

// const DropBox = styled.div`
//   background-color: white;
//   box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05);
//   width: 10rem;
//   padding: 0 1.5rem;
//   position: absolute;
//   left: 1136px;
//   top: 671px;
// `;

// const DropList = styled.ul`
//   list-style: none;
//   line-height: 2rem;
//   font-family: 'Pretendard-Regular';
// `;

// const DropListItem = styled.li`
//   color: #B6B6B6;

//   &:hover {
//     color: #343434;
//     font-family: 'Pretendard-Medium';
//   }
// `;
