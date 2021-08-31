import axios from 'axios';
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
} from '../constants/categoryConstants';
import { BASE_URL } from '../constants/Globals';

export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST });
    const { data } = await axios.get(`${BASE_URL}api/v2/admin/category`);

    dispatch({
      type: CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}api/v2/admin/category/${id}`,
      config
    );

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const createCategory = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}api/v2/admin/category`,
      formdata,
      config
    );

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });

    dispatch(getCategory());
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    await axios.delete(`${BASE_URL}api/v2/admin/category/${id}`, config);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
    });

    dispatch(getCategory());

    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      ///dispatch(logout())
    }
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};
