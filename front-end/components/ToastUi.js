import React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function ToastUi() {
  const editorRef = React.createRef();

  const handleChange = () => {
    console.log(editorRef.current.getInstance().getHTML());
  }

  return (
      <>
          <Editor
              initialValue=""
              // usageStatistics={false}
              previewStyle="vertical"
              height="702px"
              initialEditType="wysiwyg"
              placeholder="내용을 입력해주세요."
              ref={editorRef}
              onChange={handleChange}
          />
      </>
  )
}

export default ToastUi;
