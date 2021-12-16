import React, { useRef, useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { setDesc } from "../../modules/editor";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import Link from 'next/link';

function ToastAnswerCreate({title, token, id}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const editorRef = useRef();
    const content = useSelector((state) => state.content.desc);

    const [currentContent, setCurrentContent] = useState("");

    const onChange = () => {
      const editorData = editorRef.current.getInstance().getHTML();
      dispatch(setDesc(editorData));
      setCurrentContent(editorData)
    };

    const handleAnswerCreate = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.defaults.headers.common["Content-Type"] = "application/json";
        await axios
          .post(`http://127.0.0.1:8000/questions/answer_create/?question_id=${id}`, {
            title: title,
            desc: content,
          })
          .then((response) => {
            console.log(response);
            router.push(`/questions/${id}`);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    };
    

    return (
      <>
        <Editor
          initialValue={currentContent}
          previewStyle="vertical"
          height="702px"
          initialEditType="wysiwyg"
          placeholder="내용을 입력해주세요."
          autofocus={false}
          ref={editorRef}
          onChange={() => onChange()}
          language="ko"
          events={{
            focus: () => {
              console.log('⭐ focus');
            },
          }}
        />
        <BtnContainer>
          <Btn onClick={handleAnswerCreate}>작성하기</Btn>
          <Link href="/" passHref>
            <Btn>나가기</Btn>
          </Link>
        </BtnContainer>
      </>
    );
}

export default React.memo(ToastAnswerCreate);

const BtnContainer = styled.div`
  width: 21.875rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1.5rem;
`;

const Btn = styled.button`
  width: 8.75rem;
  height: 3rem;
  background-color: #f5f5f7;
  /* border: 3px solid #FFFFFF; */
  /* border: none; */
  box-sizing: border-box;
  border-radius: 1.5625rem;
  cursor: pointer;
`;
