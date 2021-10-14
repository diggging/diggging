import React from "react";
import { createGlobalStyle } from "sytled-components";
import reset from "styled-reset";
import "./static/fonts/font.css";

const GlobalStyles = createGlobalStyle`
  ${reset};
  /* 색상들 */

  /* 기본정렬 */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Prentendard-Regular', 'Arial', sans-serif;
    line-height: 1.5;
  }
  /* 태그 설정 */
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
