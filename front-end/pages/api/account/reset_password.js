import { API_URL } from "../../../config";

export default async (req, res) => {
  
  // const body = JSON.stringify({email, username});

  try {
    const apiRes = await axios.post(`${API_URL}/users/password_reset/`,  {
      email: email,
      username: username,
    }, {
      headers: {
        "Accept": "application/json",
      }
    })
    const data = await apiRes.json();
    if (apiRes.ok || apiRes === 200) {
      return res.status(apiRes.status).json({data})
    } else {
      return res.status(apiRes.status).json({data})
    }
  } catch (err) {
    return res.status(500);
  }
};
