import axios from "axios";
import { BASE_URL } from "../constants/Globals";
import {
  PERMISSION_CREATE_FAIL,
  PERMISSION_CREATE_REQUEST,
  PERMISSION_CREATE_SUCCESS,
} from "../constants/permissionConstants";

export const createPermission = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: PERMISSION_CREATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}api/v2/admin/addpermission`,
      formdata,
      config
    );
    

    dispatch({
      type: PERMISSION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    /*if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }*/
    dispatch({
      type: PERMISSION_CREATE_FAIL,
      payload: message,
    });
  }
};
