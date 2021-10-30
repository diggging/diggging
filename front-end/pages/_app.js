import React, { useState } from "react";
import { Component } from "react";
import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../public/static/fonts/font.css";

const GlobalStyles = createGlobalStyle`
  ${reset};
    /* 기본정렬 */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard-Regular', 'Arial', sans-serif;
    line-height: 1.5;
  }
  /* 태그 설정 */
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const colors = {
  darkBlue: '#00537A',
  lightBlue: '#9FAEB6',
  deepYellow: '#FFBA42',
  yellow: '#FFD358',
  lightYellow: '#FFE59C',
  gray: '#C4C4C4',
}

function MyApp({ Component, pageProps }) {
  return (
    <>
    <GlobalStyles/>
    <ThemeProvider theme={colors}>
      <Component {...pageProps} />;
    </ThemeProvider>
    </>
  )
}

export default MyApp;
