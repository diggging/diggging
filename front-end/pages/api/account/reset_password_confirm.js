import {API_URL} from "../../../config/index"

export default async (req, res) => {
  
  const {username, temp, new_password, password_confirm} = req.body;
  const body = JSON.stringify({
    username, temp, new_password, password_confirm
  })

  try {
     const apiRes = await fetch(`${API_URL}/users/password_reset_API/`, { 
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: body,
    })

    const data = await apiRes.json();
    console.log(data, 'data');

    if (apiRes.ok || apiRes.status === 200) {
      return res.status(apiRes.status).json({data})
    } else if (apiRes.status === 400) {
      return res.status(apiRes.status).json({data})
    }
  } catch (err) {
    return res.status(500).json({error:"문제가 발생했습니다"});
  }
};
