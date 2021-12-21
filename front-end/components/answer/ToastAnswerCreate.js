import React, { useRef, useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import Prism from 'prismjs';
import "@toast-ui/editor/dist/toastui-editor.css";
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from "@toast-ui/react-editor";
import { setDesc } from "../../modules/editor";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import Link from 'next/link';
import {API_URL} from '../../config/index';
import { Alert } from "../Alert";
import { alertService } from "../alert.service";

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
          .post(`${API_URL}/questions/answer_create/?question_id=${id}`, {
            title: title,
            desc: content,
          })
          .then((response) => {
            dispatch(setDesc(""));
            alertService.success("답변이 업로드 되었습니다.");
            setTimeout(() => {
              router.push(`/questions/${id}`);
            }, 1500)
          })
          .catch((error) => {
            if(errorr.response === 400) {
              alertService.warn("빈 칸 없이 모두 작성해주세요.");
            }
          });
      } catch (e) {
        alertService.warn("업로드에 실패했습니다.");
      }
    };
    

    return (
      <>
        <Alert/>
        <Editor
          initialValue={content}
          previewStyle="vertical"
          height="702px"
          initialEditType="wysiwyg"
          placeholder="내용을 입력해주세요."
          // plugins={[[codeSyntaxHighlight, { highlighter: Prism }], [colorSyntax]]}
          autofocus={false}
          ref={editorRef}
          onChange={() => onChange()}
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
