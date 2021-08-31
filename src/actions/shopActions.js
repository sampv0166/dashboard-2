import axios from "axios";
import { BASE_URL } from "../constants/Globals";
import {
  SHOP_CREATE_FAIL,
  SHOP_CREATE_REQUEST,
  SHOP_CREATE_SUCCESS,
  SHOP_DELETE_FAIL,
  SHOP_DELETE_REQUEST,
  SHOP_DELETE_SUCCESS,
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_FAIL,
  SHOP_REQUEST,
  SHOP_SUCCESS,
} from "../constants/shopConstants";
import { createPermission } from "./permissionActions";

export const listShops = (pageNumber, history) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo.user.typeofuser === "A") {
    
    history.push(`/shops/createshop/${userInfo.user.shop_id}`);
    return;
  }

  try {
    dispatch({ type: SHOP_REQUEST });

    const { data } = await axios.get(
      `${BASE_URL}api/v2/public/shop?page=${pageNumber}`
    );

    dispatch({
      type: SHOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listShopDetails = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: SHOP_DETAILS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}api/v2/public/shop/${shopId}`,
      config
    );

    dispatch({
      type: SHOP_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const createShop = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: SHOP_CREATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}api/v2/admin/shop`,
      formdata,
      config
    );

    formdata.delete("id");
    formdata.set("user_id", data.id);

    dispatch(createPermission(dispatch, formdata));

    dispatch({
      type: SHOP_CREATE_SUCCESS,
      payload: data,
    });



    if(userInfo.user.typeofuser === 'S')
    {
      dispatch(listShops(1));
    }
    



  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
    dispatch({
      type: SHOP_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteShop = (formdata) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHOP_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    await axios.post(`${BASE_URL}api/v2/admin/deleteshop`, formdata, config);
    if(userInfo.user.typeofuser === 'S')
    {
      dispatch(listShops(1));
    }
    
    dispatch({
      type: SHOP_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      ///dispatch(logout())
    }
    dispatch({
      type: SHOP_DELETE_FAIL,
      payload: message,
    });
  }
};
