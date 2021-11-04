import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_fAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from "./actions/types";

export const load_user = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api주세요흑흑`, config);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL
      })
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL
    });
  }
};

export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({email, password});

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/어쩌고저쩌고url주세요`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_fAIL
    })
  }
};