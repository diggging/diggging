import { API_URL } from '../../../config/index';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, nickname, email, password, passwordCheck } = req.body;

    const body = JSON.stringify({
      username,
      nickname,
      email,
      password,
      passwordCheck,
    });

    try {
      const apiRes = await fetch(`${API_URL}/api/Signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 201) {
        return res.status(201).json({ success: data.success });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: '회원가입 도중 문제가 발생했습니다.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
