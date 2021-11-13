import cookie from 'cookie';
import {API_URL} from '../../../config/index';


export default async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const refresh = cookies.refresh ?? false;
    //cookie가 없을 때 false.
    if (refresh === false) {
      return res.status(401).json({
        error: 'User unauthorized to make this request'
      });
    }
    //cookie.refresh를 JSON문자열로 변환해서 body에 할당.
    const body = JSON.stringify({refresh});
    
    try {
      const apiRes = await fetch(`${API_URL}/user/token refresh api주세요`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body
        //cookie를 body에 넣어서 post한당
      });
      
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        res.setHeader('Set-Cookie', [
          cookie.serialize(
            'access', data.access, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 30,
              sameSite: 'strict',
              path: '/api/',
            }
          ),
          cookie.serialize(
            'refresh', data.refresh, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60 * 24,
              sameSite: 'strict',
              path: '/api/'
            }
          )
        ]);

        return res.status(200).json({
          success: 'Refresh request successful'
        });
      } else { //상태가 200이 아닐때
        return res.status(apiRes.status).json({
          error: 'Failed to fulfill refresh request'
        })
      }
    
    } catch(err) {
      return res.status(500).json({
        error: 'refresh request를 만족하는 데 문제가 발생했습니다. '
      });
    }
  } else { //요청이 get이 아닐 때
    res.setHeader('Allow', ['GET']);
    return res.status(405).json(
      {error: `요청 방식 ${req.method}는 허용되지 않습니당`}
    )
  }
};