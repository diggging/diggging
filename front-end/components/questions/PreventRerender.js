import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import NavBar from "../NavBar";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import QuestionList from "../questions/QuestionList";
import Layout from "../../hocs/Layout";
import { useRouter } from "next/router";
import { setQuestion, setMine } from "../../modules/questions";
import recent from "../../pages/recent";
import SvgDigggingLogo from "../../public/static/images/digggingLogo";

function Prevent({ children }) {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    data,
    count,
    page,
    bigCriteria,
    smallCriteria,
    loading,
    error,
    mineToken,
  } = useSelector((state) => state.questions);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isRcent, setIsRcent] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [isMine, setIsMine] = useState(false);

  const ToggleDispatch = (bigCriteria, smallCriteria) => {
    if (bigCriteria !== undefined) {
      dispatch(setQuestion(1, bigCriteria, smallCriteria));
      setOpen(false);
    } else if (bigCriteria === undefined) {
      dispatch(setMine(1, smallCriteria, mineToken));
      setOpen(false);
    }
  };

  const styleHandle = () => {
    if (bigCriteria === "recent") {
      setIsRcent(true);
      setIsPopular(false);
      setIsMine(false);
    } else if (bigCriteria === "popular") {
      setIsRcent(false);
      setIsPopular(true);
      setIsMine(false);
    } else {
      setIsRcent(false);
      setIsPopular(false);
      setIsMine(true);
    }
  };

  const style = {
    color: "#FFD358",
  };

  useEffect(() => {
    styleHandle();
  }, [bigCriteria]);

  useEffect(() => {
    const checkClickOutSide = (e) => {
      if(open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", checkClickOutSide)
    return () => {
      document.addEventListener("mousedown", checkClickOutSide)
    }
  },[open])

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
        <TabItemContainer>
          {isAuthenticated ? (
            <TabContainer>
              {isRcent ? (
                <>
                  <Link href="/recent">
                    <Tab style={style}>최신 질문 순</Tab>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/recent">
                    <Tab>최신 질문 순</Tab>
                  </Link>
                </>
              )}
              {isPopular ? (
                <>
                  <Link href="/popular">
                    <Tab style={style}>인기 순</Tab>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/popular">
                    <Tab>인기 순</Tab>
                  </Link>
                </>
              )}
              {isMine ? (
                <>
                  <Link href="/mine">
                    <Tab style={style}>내가 남긴 질문</Tab>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/mine">
                    <Tab>내가 남긴 질문</Tab>
                  </Link>
                </>
              )}
            </TabContainer>
          ) : (
            <TabContainer>
              {isRcent ? (
                <>
                  <Link href="/recent">
                    <Tab style={style}>최신 질문 순</Tab>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/recent">
                    <Tab>최신 질문 순</Tab>
                  </Link>
                </>
              )}

              <Link href="/popular">
                <Tab>인기 순</Tab>
              </Link>
            </TabContainer>
          )}
          <ToggleContainer
            onClick={() => {
              setOpen(!open);
            }}
            ref={ref}
          >
            {smallCriteria === "all" ? (
              <>답변 전체</>
            ) : smallCriteria === "wait_answer" ? (
              <>답변 대기 중</>
            ) : smallCriteria === "answer_done" ? (
              <>답변 완료</>
            ) : null}
          </ToggleContainer>
          {open ? (
            <DropBox>
              <DropList ref={ref}>
                <DropListItem
                  onClick={() => ToggleDispatch(bigCriteria, "wait_answer")}
                >
                  답변 대기 중
                </DropListItem>
                <DropListItem
                  onClick={() => ToggleDispatch(bigCriteria, "answer_done")}
                >
                  답변 완료
                </DropListItem>
                <DropListItem
                  onClick={() => ToggleDispatch(bigCriteria, "all")}
                >
                  답변 전체
                </DropListItem>
              </DropList>
            </DropBox>
          ) : null}
        </TabItemContainer>
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

const TabItemContainer = styled.div`
  width: 100%;
  height: 70px;
  border-top: 2px solid rgba(219, 214, 199, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 98px;
  position: relative;
  margin-bottom: 46px;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tab = styled.div`
  width: 130px;
  height: 53px;
  color: #898a90;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 28.96px;
  /* margin-right: 30px; */

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
  font-size: 0.875rem;
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
