import { API_URL } from '../../../config/index';

var apiRes;
export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, user_nickname, email, password1, password2 } = req.body;

    const body = JSON.stringify({
      username,
      user_nickname,
      email,
      password1,
      password2,
    });

    try {
      var apiRes = await fetch(`${API_URL}/users/api/Signup/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.ok || apiRes === 201 || apiRes === 200) {
        return res.status(201).json({ success: data.success });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      // console.log(err.response.request._response);
      return res.status(500).json({
        error: '회원가입 도중 문제가 발생했습니다.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
