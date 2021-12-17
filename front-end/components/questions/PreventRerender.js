import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import NavBar from "../NavBar";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import QuestionList from "../questions/QuestionList";
import Layout from "../../hocs/Layout";
import SvgDigggingLogo from "../../public/static/images/DigggingLogo";
import { useRouter } from "next/router";
import { setQuestion, clearBigCriteria, clearQuestion } from "../../modules/questions";
import recent from "../../pages/recent";

function Prevent({ children }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {data, count, page, bigCriteria, smallCriteria, loading, error} = useSelector((state) => state.questions);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const ToggleDispatch = (page, smallCriteria) => {
    // dispatch(setRecent(page, smallCriteria));
  };

  return (
    <Layout>
      <NavBar />
      <BannerBackground>
        <Image
          src="/../public/static/images/main_banner_back.png"
          quality={100}
          layout="fill"
          objectFit="cover"
        />
        <SubTitle>개발자들을 위한 커뮤니티,</SubTitle>
        <SvgDigggingLogo display="block" />
        <ServiceTitle>디깅에 기록하고, 질문하고, 공유하세요</ServiceTitle>
        <ServiceIntro>
          질문하고 기록하는 습관은 누구든 성장하게 해줍니다
          <br />
          개발도중 겪는 시행착오들을 디깅에 기록하고, 공유해보세요!
          <br />
          실력있는 개발자들이 함께할 거에요.
        </ServiceIntro>
      </BannerBackground>
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
            <div>
              <Link href="/recent">
                <Tab>최신 질문 순</Tab>
              </Link>
              <Link href="/popular">
                <Tab>인기 순</Tab>
              </Link>
              <Link href="/mine">
                <Tab>내가 남긴 질문</Tab>
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/recent">
                <Tab>최신 질문 순</Tab>
              </Link>
              <Link href="/popular">
                <Tab>인기 순</Tab>
              </Link>
            </div>
          )}
          <ToggleContainer
            onClick={() => {
              setOpen(!open);
            }}
          >
            답변 전체
          </ToggleContainer>
          {open ? (
            <DropBox>
              <DropList>
                <DropListItem
                  onClick={() => ToggleDispatch(1, "wait_answer")}
                >
                  답변 대기 중
                </DropListItem>
                <DropListItem
                  onClick={() => ToggleDispatch(1, "answer_done")}
                >
                  답변 완료
                </DropListItem>
                <DropListItem
                  onClick={() => ToggleDispatch(1, "all")}
                >
                  답변 전체
                </DropListItem>
              </DropList>
            </DropBox>
          ) : null}
        </TabContainer>
        <QuestionsContainer>
            <>{children}</>
        </QuestionsContainer>
      </Container>
    </Layout>
  );
}

export default Prevent;

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
  font-family: "Pretendard-Bold";
  font-size: 1.75rem;
  display: inline-block;
  background-color: #ffba42;
  margin-bottom: 1rem;
  padding: 0.1rem 0.6rem;
  border-radius: 0.4rem;

  @media ${({ theme: { device } }) => device.tablet} {
    font-size: 1.5rem;
  }
  @media ${({ theme: { device } }) => device.mobile} {
    font-size: 1.3rem;
  }
`;

const ServiceTitle = styled.h3`
  color: #343434;
  font-family: "Pretendard-Bold";
  font-size: 1.75rem;
  letter-spacing: -4;
  margin-top: 3rem;
  @media ${({ theme: { device } }) => device.tablet} {
    font-size: 1.5rem;
    margin-top: 2.3rem;
  }
  @media ${({ theme: { device } }) => device.mobile} {
    font-size: 1.3rem;
    margin-top: 1.6rem;
  }
`;

const ServiceIntro = styled.p`
  color: #343434;
  font-family: "Pretendard-Medium";
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
  width: 1068px;
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
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 98px;
  position: relative;
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
  /* height: 100vh; */
`;

const ToggleContainer = styled.button`
  background: white;
  width: 8.25rem;
  height: 2.5rem;
  border-radius: 4px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: rgb(73, 80, 87);
  font-size: 0.875rem;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
  cursor: pointer;
      <ImageContainer>
        <Image src="/../public/static/images/a.png" width={1440} height={511} />
      </ImageContainer>

  & svg {
    margin-left: 10px;
  }
`;

const DropBox = styled.div`
  width: 8.25rem;
  /* height: 8.1875rem; */
  position: absolute;
  right: 1.8%;
  top: 100%;
  z-index: 5;
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const DropList = styled.ul`
  text-align: center;
  list-style: none;
  line-height: 2rem;
  font-family: "Pretendard-Regular";
`;

const DropListItem = styled.li`
  color: #b6b6b6;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    color: #343434;
    font-family: "Pretendard-Medium";
  }
`;
