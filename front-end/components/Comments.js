import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CommentContainer = styled.div`
  width: 31.25 rem;
  height: 35.625 rem;
  background: #ffffff;
  border-radius: 1.25 rem;
`;

const CommentInput = styled.input``;

const CommentSubMit = styled.button``;

function Comments({ CommentLists }) {
  // post용
  const [Comment, setComment] = useState('');

  // input change
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e) => {
    //refresh 방지
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/comments/list_create_comment/', {
          text: Comment,
          user: 1,
        })
        .then((response) => {
          if (response.data) {
            setComment("");
          } else {
            console.log("comments save error");
          }
          // setComment("");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <CenterContainer>
        <CommentContainer>
          {/* Comment Lists  */}
          {CommentLists.map((item) => item.text)}
          
          {/* Comment Form  */}
          <CommentInput onChange={handleChange} value={Comment} />
          <CommentSubMit onClick={onSubmit}>댓글 남기기</CommentSubMit>
        </CommentContainer>
      </CenterContainer>
    </div>
  );
}

export default Comments;
