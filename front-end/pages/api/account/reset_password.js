import { API_URL } from "../../../config";

export default async (req, res) => {
  
  const {email, username} = req.body;
  const body = JSON.stringify({
    username,
    email,
  })

  try {
     const apiRes = await fetch(`${API_URL}/users/password_reset/`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: body,
    })

    const data = await apiRes.json();

    if (apiRes.ok || apiRes === 200) {
      return res.status(apiRes.status).json({data})
    } else {
      return res.status(apiRes.status).json({data})
    }
  } catch (err) {
    console.log(email, username, 'reset')
    return res.status(500).json({error:"문제가 발생했습니다"});
  }
};
