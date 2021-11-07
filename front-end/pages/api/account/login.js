import cookie from 'cookie';
import { API_URL } from '../../../config/index';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const body = JSON.stringify({
      username,
      password,
    });

    try {
      const apiRes = await fetch(`${API_URL}/users/api/Login/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        res.setHeader('Set-Cookie', [
          //access token을 가져온다
          cookie.serialize('access', data.access, {
            httpOnly: true, //javascript로access할 수 없게 막음
            secure: process.env.NODE_ENV !== 'development', //false
            //true로 바꾸고싶으면 .env가서 development다른걸로 바꾸기 ex) 'production'
            maxAge: 60 * 30, //언제 expire될지:60초(1분)*30 = 30분
            sameSite: 'strict',
            path: '/api/',
          }),
          cookie.serialize('refresh', data.refresh, {
            httpOnly: true, //javascript로access할 수 없게 막음
            secure: process.env.NODE_ENV !== 'development', //false
            //true로 바꾸고싶으면 .env가서 development다른걸로 바꾸기 ex) 'production'
            maxAge: 60 * 60 * 24, //하루(24시간)
            sameSite: 'strict',
            path: '/api/',
          }),
        ]);

        return res.status(200).json({
          success: 'Logged in successfully',
        });
      } else {
        return res.status(apiRes.status).json({
          error: 'Authetication failed',
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: '로그인 도중 문제가 발생했습니다.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
