import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

function QuestionView({ desc }) {
  return (
    <FlexContainer>
      <Viewer
        initialValue={desc}
        width={100}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </FlexContainer>
  );
}

export default QuestionView;

const FlexContainer = styled.div`
  text-align: start;
`;