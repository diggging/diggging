import cookie from 'cookie';
import {API_URL} from '../../../config/index';

export default async (req, res) => {
  //요청이 get인 경우 cookie value를 parse한다
  if (req.method === 'GET') {
    //undefined나 null일땐 ''빈문자열로 할당 
    const cookies = cookie.parse(req.header.cookie ?? '');
    //header에 cookie가 있을 땐 해당 쿠키를 parse하고 access, refresh token을 갖게됨
    //header에 cookie가 없을 땐 {}빈 object가 반환됨
    const access = cookies.access ?? false; //cookie가 빈 문자열일 땐 => undefined되어서 access가 false가 됨

    //access가 false일 때 = cookie가 없을 때 unauthorized user 에러를 보내주자
    if (access === false) {
      return res.status(401).json({
        error: 'User unauthorized to make this request'
      });
    }
    //access가 false가 아니라면 user api받아오깅
    try {
      const apiRes = await fetch(`${API_URL}api/users/`, { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${access}`
        }
      });
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({
          user: data.user //보내주는 data구조 확인필요
        });
      } else {
        return res.status(apiRes.status).json({
          error: data.error
        });
      }
    } catch(err) {
      return res.status(500).json({
        error: '유저 정보를 불러오는 동안 문제가 발생했습니다.'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`
    });
  }
}