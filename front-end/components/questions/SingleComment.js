import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { check_auth_status, load_user } from "../../redux/actions/auth";

function SingleComment({ data, comment, setComment, setCommentNum, commentNum }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [token, setToken] = useState("");

  const { created } = data;
  const createdAtDate = new Date(created);
  const createdYear = createdAtDate.getFullYear();
  const createdMonth = createdAtDate.getMonth() + 1;
  const createdDate = createdAtDate.getDate();
  const createdHour = createdAtDate.getHours();
  const createdMinutes = createdAtDate.getMinutes();
  
  const deleteComment = async (id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .delete(`http://127.0.0.1:8000/comments/${id}/comment_delete/`)
        .then((response) => {
          setComment(comment.filter(comment => comment.id !== data.id))
          setCommentNum(commentNum-1);
        });
    } catch (e) {
      console.log(e);
    }
  };

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

  console.log(user)

  return (
    <>
      <ul>
        {data.user ? (
          <>
            <CommentContainer>
              <Container>
                <UserImg></UserImg>
                <UserInfoContainer>
                  <NameDateContainer>
                    <FlexContainer>
                      <UserNickName>{data.user.user_nickname}</UserNickName>
                      <CommentDate>
                        {createdYear}년 {createdMonth}월 {createdDate}일{" "}
                        {createdHour}시 {createdMinutes}분{/* {list.created} */}
                      </CommentDate>
                    </FlexContainer>

                    {data.user?.id === user?.user?.id ? (
                      <>
                        <FlexContainer>
                          <BtnContainer>
                            <Btn>수정하기</Btn>
                            <Btn onClick={()=>deleteComment(data.id)}>삭제하기</Btn>
                          </BtnContainer>
                        </FlexContainer>
                      </>
                    ) : null}
                  </NameDateContainer>

                  <CommentText>{data.text}</CommentText>
                </UserInfoContainer>
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
  margin-bottom: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ececec;
  padding-bottom: 23px;
`;

const UserImg = styled.div`
  width: 44px;
  height: 44px;
  background: #ffd358;
  border-radius: 50px;
  margin-right: 20px;
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
