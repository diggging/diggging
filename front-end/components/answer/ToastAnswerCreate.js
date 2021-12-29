import React, { useRef, useState, useEffect } from "react";
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
import WhiteButton from "../common/WhiteButton";
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
        dispatch(setDesc(""));
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
            }, 1000)
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

    useEffect(() => {
      return () => {
        dispatch(setDesc(""));
      }
    }, [])
    
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
              
            },
          }}
        />
        <BtnContainer>
          <WhiteButton onClick={handleAnswerCreate} paddingTop="0.75rem" paddingRight="2.375rem" fontSize="1rem">작성하기</WhiteButton>
          <Link href="/" passHref>
            <WhiteButton paddingTop="0.75rem" paddingRight="2.375rem" fontSize="1rem">나가기</WhiteButton>
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
