import {API_URL} from "../../../config/index"

export default async (req, res) => {
  
  const {newPW, confirmPW} = req.body;
  const body = JSON.stringify({
    newPW,
    confirmPW,
  })
  try {
     const apiRes = await fetch(`${API_URL}/2/password_reset_API/`, { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: body,
    })

    const data = await apiRes.json();
    console.log(data, 'data');

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