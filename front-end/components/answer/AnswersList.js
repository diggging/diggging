import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import dynamic from "next/dynamic";
import SelectedAnswer from "../../public/static/images/SelectedAnswer";
import NotSelectedAnswer from "../../public/static/images/NotSelectedAnswer";
import Selected from "./Selected";
import { API_URL } from "../../config";
import AnswerComment from "../comment/answerComment/AnswerComment";
import Image from "next/image";
import Loader from 'react-loader-spinner';
import WhiteButton from "../common/WhiteButton";

function AnswersList({ answer, user, token, questionId, questionUserId, AnswerisSelected }) {
  const ref = useRef();
  const [answerToken, setAnswerToken] = useState(token);
  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [commentIsOpen, setCommentIsOpen] = useState(true);
  const [loaderHeight, setLoaderHeight] = useState(null);
  const router = useRouter();

  const { created } = answer;
  const createdAtDate = new Date(created);
  const createdYear = createdAtDate.getFullYear();
  const createdMonth = createdAtDate.getMonth() + 1;
  const createdDate = createdAtDate.getDate();
  const createdHour = createdAtDate.getHours();
  const createdMinutes = createdAtDate.getMinutes();

  const handleCommentOpen = () => {
    setCommentIsOpen(!commentIsOpen);
  };

  const deleteAnswer = async (id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${answerToken}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .delete(`${API_URL}/questions/${id}/answer_delete/`)
        .then((response) => {
          router.reload(`/questions/${questionId}`);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  const Viewer = dynamic(() => import("../../components/answer/AnswerView"), {
    ssr: false,
    loading: () => <Loader type="Oval" color="#FFE59C" width={100} height={loaderHeight}/>
  });
  
  useEffect(() => {
    setLoaderHeight(ref.current.clientHeight);
  }, [])

  return (
    <>
      <MainContainer>
        <Container>
          <HeadContainer>
            <Title>{answer.title}</Title>
            {!answer.selection ? (
              <>
                <Selection>
                  <NotSelectedAnswer />
                </Selection>
              </>
            ) : (
              <>
                <Selection>
                  <SelectionText>
                    채택 완료
                  </SelectionText>
                  <SelectedAnswer />
                </Selection>
              </>
            )}
          </HeadContainer>

          <SecondContainer>
            <Data>
              {createdYear}년 {createdMonth}월 {createdDate}일 {createdHour}시{" "}
              {createdMinutes}분
            </Data>
            {answer.user?.id === user?.user?.id ? (
              <>
                <BtnContainer>
                  <Link href={`/answer/update/${answer.id}`} passHref>
                    <Btn>수정하기</Btn>
                  </Link>
                  <Btn onClick={() => deleteAnswer(answer.id)}>삭제하기</Btn>
                </BtnContainer>
              </>
            ) : (
              <></>
            )}
          </SecondContainer>

          <DescContainer ref={ref}>
            <Viewer desc={answer.desc} />
          </DescContainer>

          <FlexContainer>
            {questionUserId === user?.user?.id && AnswerisSelected === false ? (
              <>
                {isOpen === true && answer.selection === false ? (
                  <>
                    <Selected
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      id={answer.id}
                      token={token}
                      questionId={answer.question}
                    />
                  </>
                ) : null}
                <WhiteButton onClick={() => onOpen()}>채택하기</WhiteButton>
                <WhiteButton onClick={() => handleCommentOpen()}>
                  {commentIsOpen === true ? (
                    <>댓글 접기</>
                  ) : (
                    <>댓글 {answer.answer_comment_count}</>
                  )}
                </WhiteButton>
              </>
            ) : (
              <>
                <WhiteButton onClick={() => handleCommentOpen()}>
                  {commentIsOpen === true ? (
                    <>댓글 접기</>
                  ) : (
                    <>댓글 {answer.answer_comment_count}</>
                  )}
                </WhiteButton>
              </>
            )}
          </FlexContainer>

          <ProfileContainer>
            <ProfileImg>
              <Image
                src={`http://localhost:8000${answer.user.user_profile_image}`}
                width={50}
                height={50}
                alt="profileImage"
                quality={100}
                // layout="fill"
                objectFit="cover"
              />
            </ProfileImg>
            <ProfileInfoContainer>
              {answer?.user?.user_nickname ? (
                <>
                  <ProfileName>{answer.user.user_nickname}</ProfileName>
                  <ProfileLevel>LV.{answer.user.user_level}</ProfileLevel>
                </>
              ) : null}
            </ProfileInfoContainer>
            {answer?.user?.user_profile_content ? (
              <>
                <ProfileContent>
                  {answer.user.user_profile_content.slice(0, 250)}
                </ProfileContent>
              </>
            ) : null}
          </ProfileContainer>
          {commentIsOpen === true ? (
            <>
              <AnswerComment
                commentCount={answer.answer_comment_count}
                comments={answer.answer_comments}
                id={answer.id}
                token={token}
              />
            </>
          ) : null}
        </Container>
      </MainContainer>
    </>
  );
}

export default React.memo(AnswersList);

const MainContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 64rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  background-color: #ffffff;
  margin: auto;
  padding: 2.625rem;
`;

const HeadContainer = styled.div`
  width: 58.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom: 1px solid #ececec;
  padding-bottom: 0.625rem;
  margin-bottom: 0.625rem;
`;

const Title = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: 1.75rem;
  line-height: 3rem;
  color: #212529;
`;

const Selection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #5f5f5f;
`;

const SelectionText = styled.div`
  margin-right: 1rem;
`;


const SecondContainer = styled.div`
  width: 58.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 0.625rem;
  margin-bottom: 0.3125rem;
`;

const Data = styled.div`
  margin-right: auto;
  height: 19px;
  font-family: 'Pretendard-Regular';
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #b8b7b4;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.div`
  width: 100%;
  height: 1.1875rem;
  font-family: 'Pretendard-Bold';
  font-size: 0.8125rem;
  line-height: 1.1875rem;
  text-align: center;
  color: #5f5f5f;
  cursor: pointer;
  margin-left: 0.8125rem;

  &:hover {
    color: #212529;
  }
`;

const DescContainer = styled.div`
  margin-top: 60px;
  margin-bottom: 60px;
  text-align: start;
`;

const FlexContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const AnswerBtn = styled.div`
  width: 98px;
  height: 37px;
  border-radius: 25px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-family: 'Pretendard-Bold';
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #5f5f5f;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
  margin-top: 25px;
  padding: 30px 20px;
  margin-bottom: 32px;
`;

const ProfileImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 20px;
  & img {
    border-radius: 50%;
  }
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-right: 20px;
`;

const ProfileName = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: 16px;
  line-height: 23px;
  color: #343434;
`;

const ProfileLevel = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: 12px;
  line-height: 17px;
  color: #7a7a7a;
`;

const ProfileContent = styled.div`
  width: 672px;
  height: 38px;
  ffont-family: 'Pretendard-Regular';
  font-size: 13px;
  line-height: 19px;
  color: #8d8c85;
  display: flex;
  align-items: center;
`;
