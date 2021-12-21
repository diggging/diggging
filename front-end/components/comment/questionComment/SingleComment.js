import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { check_auth_status } from "../../../redux/actions/auth";
import TextareaAutosize from "react-autosize-textarea";
import { API_URL } from "../../../config";
import Image from "next/image";


function SingleComment({
  data,
  comment,
  setComment,
  setCommentNum,
  commentNum,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [token, setToken] = useState("");

  const [isUpdated, setIsUpdated] = useState(false);
  const [updateData, setUpdateData] = useState(data.text);
  const [text, setText] = useState("");

  const { created } = data;
  const createdAtDate = new Date(created);
  const createdYear = createdAtDate.getFullYear();
  const createdMonth = createdAtDate.getMonth() + 1;
  const createdDate = createdAtDate.getDate();
  const createdHour = createdAtDate.getHours();
  const createdMinutes = createdAtDate.getMinutes();

  const onChange = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );
  


  const onClickUpdate = () => {
    setIsUpdated(true);
    setText(updateData);
  }

  const deleteComment = async (id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .delete(`${API_URL}/comments/${id}/comment_delete/`)
        .then((response) => {
          setComment(comment.filter((comment) => comment.id !== data.id));
          setCommentNum(commentNum - 1);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const upDataComment = async (id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios.patch(`${API_URL}/comments/${id}/question_comment_update/`, {
        text: text
      })
      .then((response) => {
        setIsUpdated(false);

        comment.map((item) => {
          if(item.id === data.id) {
            setUpdateData(text)
          }
        })

      });
    } catch (e) {
      console.log(e);
    }
  }

  const getAccessToken = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(check_auth_status())
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.access;
          setToken(accessToken);
        })
        .catch((err) => console.log(err));
    }
  };

  //token 확인(refresh, verify)
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(check_auth_status());
    getAccessToken();
  }, [dispatch]);

  return (
    <>
      <ul>
        {data.user ? (
          <>
            <CommentContainer>
              <Container>
                {isUpdated ? (
                  <>
                    <CommentUpdateContainer>
                      <CommentInput name="text" value={text} onChange={onChange}/>
                      <CommentSendBtn type="button" onClick={() => upDataComment(data.id)}>댓글 남기기</CommentSendBtn>
                    </CommentUpdateContainer>
                  </>
                ) : (
                  <>
                    <UserImg>
                      <Image
                          src={`${data.user.user_profile_image}`}
                          width={50}
                          height={50}
                          alt="profileImage"
                          quality={100}
                          // layout="fill"
                          objectFit="cover"
                        />
                    </UserImg>
                    <UserInfoContainer>
                      <NameDateContainer>
                        <FlexContainer>
                          <UserNickName>{data.user.user_nickname}</UserNickName>
                          <CommentDate>
                            {createdYear}년 {createdMonth}월 {createdDate}일{" "}
                            {createdHour}시 {createdMinutes}분
                          </CommentDate>
                        </FlexContainer>

                        {data.user?.id === user?.user?.id ? (
                          <>
                            <FlexContainer>
                              <BtnContainer>
                                <Btn onClick={() => onClickUpdate()}>
                                  수정하기
                                </Btn>
                                <Btn onClick={() => deleteComment(data.id)}>
                                  삭제하기
                                </Btn>
                              </BtnContainer>
                            </FlexContainer>
                          </>
                        ) : null}
                      </NameDateContainer>

                      <CommentText>{updateData}</CommentText>
                    </UserInfoContainer>
                  </>
                )}
              </Container>
            </CommentContainer>
          </>
        ) : null}
      </ul>
    </>
  );
}

export default React.memo(SingleComment);

const CommentContainer = styled.ul`
  width: 100%;
  height: 100%;
  margin-top: 23px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ececec;
  padding-top: 23px;
`;

const UserImg = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50px;
  margin-right: 20px;
  & img {
    border-radius: 50%;
  }
`;

const UserInfoContainer = styled.div`
  width: 934px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;

const NameDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const UserNickName = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #343434;
  margin-right: 10px;
`;

const CommentDate = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  color: #b8b7b4;
`;

const CommentText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #585858;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.div`
  width: 100%;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #bababa;
  cursor: pointer;
  margin-left: 0.8125rem;

  &:hover {
    color: #212529;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentUpdateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CommentInput = styled(TextareaAutosize)`
  resize: none;
  width: 758px;
  min-height: 6.125rem;
  border: 1px solid #ececec;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 1rem 1rem 1.5rem;
  font-family: Noto Sans KR;
  font-size: 1rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
  margin-right: 30px;
  &:focus {
    outline: 0;
  }
`;

const CommentSendBtn = styled.button`
  width: 114px;
  height: 38px;
  background: #ffd358;
  box-shadow: 4px 4px 8px rgba(170, 170, 170, 0.1);
  border-radius: 20px;
  font-family: 'Pretenard-Bold';
  font-size: 13px;
  line-height: 19px;
  color: #343434;
`;
