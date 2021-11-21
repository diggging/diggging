import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { check_auth_status } from '../redux/actions/auth';
import Head from 'next/head';
import Navbar from '../components/NavBar';
import styled from 'styled-components';

const Layout = ({title, content, children}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    if (dispatch && dispatch !== null && dispatch !== undefined)
        dispatch(check_auth_status());
  }, [dispatch])

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
      <Navbar />
      <div>{children}</div>
    </>
  );
};

Layout.defaultProps = {
  title: 'Diggging',
  content: '개발자를 위한 코드기록 및 질문 커뮤니티'
}

export default Layout;