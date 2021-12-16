import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import CommentList from "./CommentList";
import axios from "axios";
import TextareaAutosize from "react-autosize-textarea";

function Comment({ commentCount, comments, id, token }) {
  const [text, setText] = useState("");
  const [commentNum, setCommentNum] = useState(commentCount);
  const [newComment, setNewComment] = useState([]);
  const onChange = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );

  const CreateComment = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .post(`http://127.0.0.1:8000/comments/question_comment_create/?question_id=${id}`, {
            text: text
        })
        .then((response) => {
          setNewComment(response.data);
          setText("");
          setCommentNum(commentNum + 1);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormContainer >
      <CommentContainer>
        <CommentInput placeholder="댓글을 입력하세요" value={text} onChange={onChange} />
        <CommentSendBtn onClick={CreateComment} type="button">댓글 남기기</CommentSendBtn>
      </CommentContainer>
      <CommentCount>댓글 {commentNum}개</CommentCount>
      <CommentList id={id} comments={comments} newComment={newComment} setCommentNum={setCommentNum} commentNum={commentNum}/>
    </FormContainer>
  );
}

export default React.memo(Comment);

const FormContainer = styled.form`
  width: 100%;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 44px;
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
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 19px;
  color: #343434;
`;

const CommentCount = styled.div`
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #343434;
  border-bottom: 1px solid #ececec;
  padding-bottom: 20px;
`;
