import React, {useCallback} from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function ToastUi({setDesc}) {
  const editorRef = React.createRef();

  const handleChange = () => {
    console.log(editorRef.current.getInstance().getValue());
    setDesc(editorRef.current.getInstance().getHTML());
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
              onChange={handleChange}
          />
      </>
  )
}

export default ToastUi;
