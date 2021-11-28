import router, {useRouter} from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '../hocs/Layout';
// import {useCookies} from 'react-cookie';
import cookie from 'cookie';
import NavBar from '../components/NavBar';

function mypage() {
  const router = useRouter();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);

  // const [cookies, setCookie, removeCookie] = useCookies('access');
  const refresh = cookie.parse('refresh');
  const access = cookie.parse('access');
  console.log(refresh)
  console.log(access)
  if (typeof window !== 'undefined' && !loading && !isAuthenticated) {
    router.push('/login');
  }

  return (
    <Layout
      title='Diggging|내 디렉토리'
      content='개발 기록과 질문을 모아놓은 내 디렉토리'
    >
      <NavBar />
      <h2>
        {user !== null && user.username}님의 모래상자
      </h2>
    </Layout>
  )
}

export default mypage;
