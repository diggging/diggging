import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";

function CommentList({ id, comments, newComment }) {
  const [comment, setComment] = useState([]);

  const updatedDate = (comments) => {
    comments.map((list) => {
      const createdAtDate = new Date(list.created);

      list["createdYear"] = createdAtDate.getFullYear();
      list["createdMonth"] = createdAtDate.getMonth() + 1;
      list["createdDate"] = createdAtDate.getDate();
      list["createdHour"] = createdAtDate.getHours();
      list["createdMinutes"] = createdAtDate.getMinutes();
    });
  };
  console.log(comment);
  useEffect(() => {
    setComment(comments);
    updatedDate(comments);
    comment.concat(newComment);
  }, [comments, newComment]);

  return (
    <>
      <ul>
        {comment &&
          comment.map((list) => (
            <CommentContainer key={list.id}>
              <Container>
                <UserImg></UserImg>

                <UserInfoContainer>

                  <NameDateContainer>
                    <UserNickName>{list.user.user_nickname}</UserNickName>
                    <CommentDate>
                      {list.createdYear}년 {list.createdMonth}월{" "}
                      {list.createdDate}일 {list.createdHour}시{" "}
                      {list.createdMinutes}분
                    </CommentDate>
                  </NameDateContainer>

                  <CommentText>
                    {list.text}
                  </CommentText>

                </UserInfoContainer>

              </Container>
            </CommentContainer>
          ))}
      </ul>
    </>
  );
}

export default React.memo(CommentList);

const CommentContainer = styled.ul`
  width: 100%;
  height: 100%;
  margin-top: 23px;
  border-bottom: 1px solid #ececec;
`;

const Container = styled.div`
  margin-bottom: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
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
