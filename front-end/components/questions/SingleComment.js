import React from "react";
import styled from "styled-components";

function SingleComment({ data }) {

  const { created } = data;
  const createdAtDate = new Date(created);
  const createdYear = createdAtDate.getFullYear();
  const createdMonth = createdAtDate.getMonth() + 1;
  const createdDate = createdAtDate.getDate();
  const createdHour = createdAtDate.getHours();
  const createdMinutes = createdAtDate.getMinutes();
  
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
                    {/* <UserNickName>{data.user.user_nickname}</UserNickName> */}
                    <CommentDate>
                      {createdYear}년 {createdMonth}월 {createdDate}일{" "}
                      {createdHour}시 {createdMinutes}분{/* {list.created} */}
                    </CommentDate>
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
