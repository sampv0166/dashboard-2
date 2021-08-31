import axios from 'axios';
import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

import { BASE_URL } from '../constants/Globals';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/v2/public/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}api/v2/public/register`,
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // dispatch({
    //  type: USER_LOGIN_SUCCESS,
    //   payload: data,
    // })

    document.location.href = '/page-login';
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch, history) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  //dispatch({ type: USER_DETAILS_RESET })

  document.location.href = '/page-login';
};

export const listUsers = (pageNumber) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get(
      `${BASE_URL}api/v2/admin/users?page=${pageNumber}`,
      config
    );

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (formdata) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    await axios.post(`${BASE_URL}api/v2/admin/deleteuser`, formdata, config);

    dispatch(listUsers(1));

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      ///dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const listUserDetails = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}api/v2/public/${shopId}`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const createUser = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}api/v2/admin/createuser`,
      formdata,
      config
    );

    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch(listUsers(1));
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
    dispatch({
      type: USER_CREATE_FAIL,
      payload: message,
    });
  }
};
