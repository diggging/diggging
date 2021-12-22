import React, { useState, useCallback } from "react";
import styled from "styled-components";
import CommentList from "../../comment/questionComment/CommentList";
import axios from "axios";
import TextareaAutosize from "react-autosize-textarea";
import { API_URL } from "../../../config";
import { alertService } from "../../alert.service";
import YellowButton from "../../common/YellowButton";

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

  const onClickIsAuth = () => {
    if (!token) {
      alertService.warn("로그인 후 이용해주세요.")
    }
  }


  const CreateComment = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .post(`${API_URL}/comments/question_comment_create/?question_id=${id}`, {
            text: text
        })
        .then((response) => {
          setNewComment(response.data);
          setText("");
          setCommentNum(commentNum + 1);
        }).catch((e) => {
          if(e.response.status === 400) {
            alertService.warn("댓글을 작성해주세요");      
          } else if(e.response.status === 401) {
            alertService.success("로그인 후 이용해주세요.");
          }
        });
    } catch (e) {
      alertService.success("로그인 후 이용해주세요.");
    }
  };

  return (
    <FormContainer >
      <CommentContainer>
        <CommentInput placeholder="댓글을 입력하세요" value={text} onChange={onChange} onClick={onClickIsAuth} />
        <YellowButton paddingTop="0.6rem" paddingRight="1.5rem" onClick={CreateComment} type="button">댓글 남기기</YellowButton>
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
  font-family: 'Pretendard-Regular';
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
  font-family: 'Pretendard-Bold';
  font-size: 13px;
  line-height: 19px;
  color: #343434;
`;

const CommentCount = styled.div`
  width: 100%;
  font-family: 'Pretendard-Bold';
  font-size: 18px;
  line-height: 21px;
  color: #343434;
  padding-bottom: 20px;
`;
