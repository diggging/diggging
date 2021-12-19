import { API_URL } from "../../../config";

export default async (req, res) => {
  
  const {username, email} = req.body;
  // const body = JSON.stringify

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
      dispatch({
        type: PASSWORD_RESET_SUCCESS
      })
      return res.status(apiRes.status).json({data})
    } else {
      return res.status(apiRes.status).json({data})
    }
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL
    });
    return res.status(apiRes.status).json({data})
  }
};
