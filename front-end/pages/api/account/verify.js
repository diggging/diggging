import cookie from 'cookie';
import {API_URL} from '../../../config/index';


//새로고침해도 cookie계속 유지되게... authentication계속유지되게..
export default async (req, res) => {
  if (req.method === 'GET') {
    // console.log(`${req.headers} 이건 headers`);
    // console.log(`${cookie.parse(req.headers.cookie)} parse한 headers.cookie입니다`)
    // console.log(`${cookie.parse(req.headers.cookie)} parse한 headers.cookie입니다`)
    // console.log(`${JSON.stringify(req.headers.cookie)} stringify한 headers.cookie입니다`)

    const cookies = cookie.parse(req.headers.cookie ?? ''); //null이거나 undefined면 ''로.
    // console.log(`${cookies} 이건 cookies`);
    //access 토큰가져오기
    const refresh = cookies.refresh ?? false; //undefined면 refresh가 false가 됨
    console.log(`${refresh} 이거 refresh 11`)
    if (refresh === false) {
      return res.status(403).json({
        error: 'User forbidden from making the request'
      });
    }

    const body = JSON.stringify({
      token: refresh
  });
  console.log(`${body} 이거 body`);
    try {
      const apiRes = await fetch(`${API_URL}/api/token/verify/`, { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (apiRes.status === 200) {
        return res.status(200).json({ success: 'Authenticated successfully '});
      } else {
        return res.status(apiRes.status).json({
          error: 'Failed to authenticate'
        });
      }
    } catch(err) {
      return res.status(500).json({
        error: '유저인증 중 문제가 발생했습니다.'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({error: `Method ${req.method} not allowed`});
  }
};