import React, { useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function ToastUi({setDesc}) {
  const editorRef = useRef();

  function onChange() {
    const editorData = editorRef.current.getInstance().getMarkdown();
    console.log(editorData);
    // setDesc(editorData);
    // setDesc(forwardedRef.current.getInstance().getHTML());
  }
  return (
      <>
          <Editor
              initialValue=""
              previewStyle="vertical"
              height="702px"
              initialEditType="wysiwyg"
              placeholder="내용을 입력해주세요."
              autofocus={false}
              ref={editorRef}
              onChange={()=>onChange()}
              language="ko"
          />
      </>
  )
}

export default ToastUi;
