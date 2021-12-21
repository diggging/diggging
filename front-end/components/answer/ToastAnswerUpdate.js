import React, { useRef,useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Prism from 'prismjs';
import "@toast-ui/editor/dist/toastui-editor.css";
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from "@toast-ui/react-editor";
import { setDesc } from "../../modules/editor";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "../../config";

function ToastAnswerUpdate({id, title, desc, token, questionId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const editorRef = useRef();
  const content = useSelector((state) => state.content.desc);
  const [descState, setDescState] = useState(desc);

  const onChange = () => {
    const editorData = editorRef.current.getInstance().getHTML();
    dispatch(setDesc(editorData));
  };

  const handleUpdate = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .put(`${API_URL}/questions/${id}/answer_update/`, {
          title: title,
          desc: content,
        })
        .then((response) => {
          dispatch(setDesc(""));
          router.push(`/questions/${questionId}`);
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
      {content ? (
        <>
          <Editor
            initialValue={content}
            previewStyle="vertical"
            height="702px"
            initialEditType="wysiwyg"
            placeholder="내용을 입력해주세요."
            // plugins={[[codeSyntaxHighlight, { highlighter: Prism }], [colorSyntax]]}
            autofocus={false}
            ref={editorRef}
            onChange={onChange}
            events={{
              focus: () => {},
            }}
          />
        </>
      ) : (
        <>
          <Editor
            initialValue={descState}
            previewStyle="vertical"
            height="702px"
            initialEditType="wysiwyg"
            placeholder="내용을 입력해주세요."
            // plugins={[[codeSyntaxHighlight, { highlighter: Prism }], [colorSyntax]]}
            autofocus={false}
            ref={editorRef}
            onChange={onChange}
            events={{
              focus: () => {},
            }}
          />
        </>
      )}
      <BtnContainer>
        <Btn onClick={handleUpdate}>수정하기</Btn>
        <Link href={`/questions/${questionId}`} passHref>
          <Btn>나가기</Btn>
        </Link>
      </BtnContainer>
    </>
  );
}

export default React.memo(ToastAnswerUpdate);

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
