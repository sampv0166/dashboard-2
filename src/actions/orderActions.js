import axios from "axios";
import { BASE_URL } from "../constants/Globals";
import {
  ORDERSTATUS_FAIL,
  ORDERSTATUS_REQUEST,
  ORDERSTATUS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../constants/orderConstants";

export const listOrders = (pageNumber) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.get(
      `${BASE_URL}api/v2/admin/orders?page=${pageNumber}`,
      config
    );

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrderStatus = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: ORDERSTATUS_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}api/v2/admin/orderstatus`,
      formdata,
      config
    );

    dispatch({
      type: ORDERSTATUS_SUCCESS,
      payload: data,
    });

    dispatch(listOrders());

  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
    dispatch({
      type: ORDERSTATUS_FAIL,
      payload: message,
    });
  }
};
