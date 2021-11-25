import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { check_auth_status } from '../redux/actions/auth';
import Head from 'next/head';
import styled from 'styled-components';

const Layout = ({title, content, children}) => {
  

  const BackgroundColor = styled.div`
    background-color: #FAFAFF;
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: -10;
  `;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Head>
      <BackgroundColor />
      <div>{children}</div>
    </>
  );
};

Layout.defaultProps = {
  title: 'Diggging',
  content: '개발자를 위한 코드기록 및 질문 커뮤니티'
}

export default Layout;