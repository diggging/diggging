import { Viewer } from '@toast-ui/react-editor';
import styled from "styled-components";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

function QuestionView ({desc}) {
  return (
    <>
      <Viewer initialValue={desc} />
    </>
  )
};

export default QuestionView;