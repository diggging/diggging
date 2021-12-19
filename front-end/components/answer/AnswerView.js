import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

function AnswerView({ desc }) {
  return (
    <Viewer
      initialValue={desc}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
}

export default AnswerView;
