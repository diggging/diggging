import React, { useState } from "react";
import styled from "styled-components";

const Title = styled.input`
  width: 51.375rem;
  height: 4.375rem;
  margin-top: 1.5rem;
  background-color: #f5f5f7;
  border: none;
  border-radius: 0.3125rem;
  padding: 0.625rem 1.25rem;
  font-size: 1.25rem;

  &:focus {
    outline: 0;
  }
`;

function QuestionTitle() {
  const [title, setTitle] = useState("");

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Title
      // name="title"
      // value={title}
      onChange={onChange}
      placeholder="제목을 입력하세요."
    />
  );
}

export default React.memo(QuestionTitle);
