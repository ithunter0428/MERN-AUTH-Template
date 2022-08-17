import axios from 'axios';
import { AUTH_SUCCESS, LOGOUT, SET_ERROR, LOADING } from '../constants/userConstansts';

export const signin = (form) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/auth/login', form, config);

    dispatch({
      type: AUTH_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: 'Invalid Username or email or password.',
    });
  }
};

export const signup = (form) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/auth', form, config);

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.dir(error)
    if(error.response.status === 400) {
      dispatch({
        type: SET_ERROR,
        payload: 'Invalid User data!',
      });
    }
    else if(error.response.status === 401) {
      dispatch({
        type: SET_ERROR,
        payload: 'Username or Email already exists!',
      });
    }
    else {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  }
};

export const setLoading = (loading) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}

export const setError = (message) => async (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: message,
  });
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: null,
  });
}