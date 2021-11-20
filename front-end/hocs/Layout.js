import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { check_auth_status } from '../redux/actions/auth';
import Head from 'next/head';
import Navbar from '../components/NavBar';

const Layout = ({title, content, children}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    if (dispatch && dispatch !== null && dispatch !== undefined)
        dispatch(check_auth_status());
  }, [dispatch])


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Head>
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