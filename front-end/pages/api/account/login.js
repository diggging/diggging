import cookie from 'cookie';
import { alertService } from '../../../components/alert.service';
import { API_URL } from '../../../config/index';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const body = JSON.stringify({
      username,
      password,
    });

    try {
      const apiRes = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const data = await apiRes.json();
      if (apiRes.status === 200) {
        // let accessToken = data.token; // access token
        // let refreshToken = request_refresh(accessToken);

        res.setHeader('Set-Cookie', [
          //access token 쿠키에저장?
          cookie.serialize('access', data.access, {
            httpOnly: true, //javascript로access할 수 없게 막음
            secure: process.env.NODE_ENV !== 'development', //false
            //true로 바꾸고싶으면 .env가서 development다른걸로 바꾸기 ex) 'production'
            maxAge: 60 * 30 * 24, //언제 expire될지:60초(1분)*30 = 30분
            sameSite: 'strict',
            path: '/api/',
          }),
          
          cookie.serialize('refresh', data.refresh, {
            httpOnly: true, //javascript로access할 수 없게 막음
            secure: process.env.NODE_ENV !== 'development', //false
            //true로 바꾸고싶으면 .env가서 development다른걸로 바꾸기 ex) 'production'
            maxAge: 60 * 60 * 48, //하루(24시간)
            sameSite: 'strict',
            path: '/api/',
          }),
        ]);
        alertService.error('로그인되었습니다.');

        return res.status(200).json({
          success: '로그인 되었습니다',
        });
      } else {
        alertService.error('아이디와 비밀번호를 다시 확인해주세요.')

        return res.status(apiRes.status).json({
          error: '아이디와 비밀번호를 다시확인해주세요',
        });
      }
    } catch (err) {
      alertService.error('로그인 도중 문제가 발생했습니다.')
      return res.status(500).json({
        error: '로그인 도중 문제가 발생했습니다.',
      });
    }
  } else {
    alertService.error('허용되지 않는 접근입니다.')
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};