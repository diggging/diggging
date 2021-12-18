import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

function AnswerView ({desc}) {
  return <Viewer initialValue={desc} />
};

export default AnswerView;