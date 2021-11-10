import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { request_refresh } from '../actions/auth';
import Head from 'next/head';
import Navbar from '../components/NavBar';

const Layout = ({title, content, children}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(request_refresh)
    }
  }, [dispatch]);

  style = {
    marginTop: '64px',
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Head>
      <Navbar />
      <div style={style}>{children}</div>
    </>
  );
};

Layout.defaultProps = {
  title: 'Diggging',
  content: '개발자를 위한 코드기록 및 질문 커뮤니티'
}

export default Layout;