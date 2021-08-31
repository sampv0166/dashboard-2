import axios from "axios";

import { BASE_URL } from "../constants/Globals";

import {
  SINGLE_VARIATION_CREATE_FAIL,
  SINGLE_VARIATION_CREATE_REQUEST,
  SINGLE_VARIATION_CREATE_SUCCESS,
  VARIATION_CREATE_FAIL,
  VARIATION_CREATE_REQUEST,
  VARIATION_CREATE_SUCCESS,
  VARIATION_DELETE_FAIL,
  VARIATION_DELETE_REQUEST,
  VARIATION_DELETE_SUCCESS,
  VARIATION_IMAGE_DELETE_FAIL,
  VARIATION_IMAGE_DELETE_REQUEST,
  VARIATION_IMAGE_DELETE_SUCCESS,
  VARIATION_IMAGE_FAIL,
  VARIATION_IMAGE_REQUEST,
  VARIATION_IMAGE_SUCCESS,
  VARIATION_UPDATE_FAIL,
  VARIATION_UPDATE_REQUEST,
  VARIATION_UPDATE_SUCCESS,
} from "../constants/variationConstants";

import { listProductDetails } from "./productActions";

export const createVariation =
  (dispatch, formdata, ProductVariationList, hasVariant, data) => async () => {
    try {
      let response;
      dispatch({
        type: VARIATION_CREATE_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };
      console.log(ProductVariationList);

      ProductVariationList.map((variations, index) => {
        const arr = variations.images.map((file) => file);

        let variationformdata = new FormData();
        let images;
        variationformdata.set("product_id", data.id);
        variationformdata.set("price", variations.price);
        variationformdata.set("offerprice", variations.offerprice);
        variationformdata.set("stocks", variations.stocks);
        variationformdata.set("color_name", variations.color_name);
        variationformdata.set("color_value", variations.color_value);

        variations.hasoffer === true
          ? variationformdata.set("hasoffer", 1)
          : variationformdata.set("hasoffer", 0);

        variationformdata.set("size_value", variations.size_value);

        if (hasVariant) {
          for (var i = 0; i < arr.length; i++) {
            variationformdata.append(`images[${i}]`, arr[i]);
          }
        } else {
          variationformdata.append(`images[${i}]`, variations.image);
        }
        for (var value of variationformdata.values()) {
        }

        const { vardata } = axios.post(
          `${BASE_URL}api/v2/admin/variation`,
          variationformdata,
          config
        );

        response = vardata;
      });

      dispatch({
        type: VARIATION_CREATE_SUCCESS,
        payload: response,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
      dispatch({
        type: VARIATION_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const createSingleVariation =
  (dispatch, formdata, productId) => async () => {
    try {
      dispatch({
        type: SINGLE_VARIATION_CREATE_REQUEST,
      });
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };
      const { data } = axios.post(
        `${BASE_URL}api/v2/admin/variation`,
        formdata,
        config
      );

      dispatch({
        type: SINGLE_VARIATION_CREATE_SUCCESS,
        payload: data,
      });

      dispatch(listProductDetails(productId));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
      dispatch({
        type: SINGLE_VARIATION_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateVariation =
  (dispatch, formdata, productId, deleteimageurl, varId) => async () => {
    try {
      dispatch({
        type: VARIATION_UPDATE_REQUEST,
      });
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };

      for (var value of formdata.values()) {
        console.log(value);
      }

      const { data } = axios.post(
        `${BASE_URL}api/v2/admin/variation`,
        formdata,
        config
      );

      if (deleteimageurl.length > 0) {
        deleteimageurl.map((url) => {
          dispatch(deleteVariationImage(url, varId, productId));
        });
      }

      dispatch({
        type: VARIATION_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch(listProductDetails(productId));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
      dispatch({
        type: VARIATION_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteVariation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VARIATION_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    await axios.delete(`${BASE_URL}api/v2/admin/variation/${id}`, config);

    dispatch({
      type: VARIATION_DELETE_SUCCESS,
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
      type: VARIATION_DELETE_FAIL,
      payload: message,
    });
  }
};

export const deleteVariationImage =
  (url, varId, productId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VARIATION_IMAGE_DELETE_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };

      let formdata = new FormData();

      formdata.set("url", url);
      formdata.set("variation_id", varId);

      await axios.post(
        `${BASE_URL}api/v2/admin/deletevariationimage`,
        formdata,
        config
      );

      dispatch({
        type: VARIATION_IMAGE_DELETE_SUCCESS,
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
        type: VARIATION_IMAGE_DELETE_FAIL,
        payload: message,
      });
    }
  };

export const insertSingleVariationImage = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: VARIATION_IMAGE_REQUEST,
    });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };
    const { data } = axios.post(
      `${BASE_URL}api/v2/admin/addvariationimage`,
      formdata,
      config
    );

    dispatch({
      type: VARIATION_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: VARIATION_IMAGE_FAIL,
      payload: message,
    });
  }
};
