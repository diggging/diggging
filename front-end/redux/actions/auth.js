import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  BAD_REQUEST,
  RESET_BAD_REQUEST,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
} from './types';
import {API_URL} from '../../config/index';
import axios from 'axios';
//유저정보 불러오기
export const load_user = () => async dispatch => {
  try {
    const res = await fetch('/api/account/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data
      });
    } else {
      dispatch({
        type: LOAD_USER_FAIL
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL
    });
  }
};
//verify는 새로고침 되어도 로그인 유지되게 하기
//check_auth_status -> verify api -> load_user()실행 -> api/account/user
export const check_auth_status = () => async dispatch => {
  try {
    const res = await fetch('/api/account/verify', { //method get에서 post로 바꿨음 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATED_SUCCESS
      });
      return res;
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL
      });
    }
  } catch(err) {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
};

export const request_refresh = () => async dispatch => {
  try {
    const res = await fetch('/api/account/refresh', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    if (res.status === 200) {
      dispatch({
        type: REFRESH_SUCCESS
      });
      dispatch(check_auth_status());
    } else {
      dispatch({
        type: REFRESH_FAIL
      });
    }
  } catch(err) {
    dispatch({
      type: REFRESH_FAIL
    });
  }
};


//회원가입
export const register =
  (username, user_nickname, email, password1, password2) => async (dispatch) => {
    const body = JSON.stringify({
      username,
      user_nickname,
      email,
      password1,
      password2,
    });
    // 회원가입 버튼 누르면 일단 로딩중.
    dispatch({
      type: SET_AUTH_LOADING,
    });

    try {
      const res = await fetch('/api/account/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (res.status === 201) {
        dispatch({
          type: REGISTER_SUCCESS,
        });
      } else if (res.status === 400) {
        dispatch({
          type: BAD_REQUEST
        });
      } else {
        dispatch({
          type: REGISTER_FAIL,
        });
      }
      return res.status;
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
      });
    }
    // 가입 끝나면 AUTH_LOADING지우기
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const reset_register_success = () => (dispatch) => {
  dispatch({
    type: RESET_REGISTER_SUCCESS,
  });
};

export const reset_bad_request = () => (dispatch) => {
  dispatch({
    type: RESET_BAD_REQUEST,
  });
}
//login하는 액션
export const login = (username, password) => async (dispatch) => {
  //username과 password를 받아와서
  const body = JSON.stringify({
    username,
    password,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    })
    console.log(`res.status ${res.status}`)

    if (res.status == 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch(load_user());
    } else if (res.status === 401 || res.status === 403 || res.status === 400) {
      dispatch({
        type: BAD_REQUEST,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
    return res.status
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
  //로그인 성공/실패하고나면 로딩중 제거
  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};


//로그아웃
export const logout = () => async dispatch => {
  try {
    const res = await fetch('/api/account/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL
    });
  }
};

//PASSWORD찾기에서의 reset_password
//email보내주기
export const reset_password = (email, username) => async (dispatch) => {
  
  // const body = JSON.stringify({email, username});

  try {
    const apiRes = await axios.post(`/api/account/reset_password/`,  {
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
    } 
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL
    });
  }
};




export const reset_password_confirm = (newPW, confirmPW) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const body = JSON.stringify({newPW, confirmPW});
  
  try {
    await axios.post(`${API_URL}/users/${userId}/password_reset_API/`, body, config);
    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL
    });
  }
}; 

