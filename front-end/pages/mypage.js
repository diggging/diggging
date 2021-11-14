import router, {useRouter} from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '../hocs/Layout';

function mypage() {
  const router = useRouter();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated) {
    router.push('/login');
  }

  return (
    <Layout
      title='Diggging|내 디렉토리'
      content='개발 기록과 질문을 모아놓은 내 디렉토리'
    >
      <h2>
        {user !== null && user.username}님의 모래상자
      </h2>
    </Layout>
  )
}

export default mypage;
