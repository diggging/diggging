import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";

function CommentList({ id, comments, newComment }) {
  const [comment, setComment] = useState([]);
  
  const updatedDate = (comments) => {
    comments.map(list => {
    const createdAtDate = new Date(list.created);
  
    list['createdYear'] = createdAtDate.getFullYear();
    list['createdMonth'] = createdAtDate.getMonth() + 1;
    list['createdDate'] = createdAtDate.getDate();
    list['createdHour'] = createdAtDate.getHours();
    list['createdMinutes'] = createdAtDate.getMinutes();
    });
  }
  
  useEffect(() => {
    setComment([...comments, newComment]);
    updatedDate(comments);
    comment.concat(newComment)
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
                  {list.user}
                  {list.createdYear}년 {list.createdMonth}월 {list.createdDate}일 {list.createdHour}
                  시 {list.createdMinutes}분
                  {list.text}
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
  /* display: flex;
  align-items: center;
  justify-content: space-around; */
`;

const Container = styled.div`
  margin-bottom: 23px;
`;

const UserImg = styled.div`
  width: 44px;
  height: 44px;
  background: #ffd358;
  border-radius: 50px;
`;

const UserInfoContainer = styled.div`
  width: 58.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const NameDate = styled.div`

`;