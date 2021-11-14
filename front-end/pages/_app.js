import React, { useState } from "react";
import { Component } from "react";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../public/static/fonts/font.css";

import { Provider } from "react-redux";
import { useStore } from "../redux/store.js";
import Head from 'next/head';

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
  darkBlue: "#00537A",
  lightBlue: "#9FAEB6",
  deepYellow: "#FFBA42",
  yellow: "#FFD358",
  lightYellow: "#FFE59C",
  gray: "#C4C4C4",
};

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Diggging</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <GlobalStyles />
        <ThemeProvider theme={colors}>
          <Component {...pageProps} />;
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
