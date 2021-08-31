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

export const shopReducer = (state = { shops: [] }, action) => {
  switch (action.type) {
    case SHOP_REQUEST:
      return { loading: true, shops: [] };
    case SHOP_SUCCESS:
      return {
        loading: false,
        shops: action.payload.data,
        pages: action.payload.last_page,
        page: action.payload.current_page,
      };
    case SHOP_FAIL:
      return { loading: false, shopError: action.payload };
    default:
      return state;
  }
};

export const shopDetailsReducer = (state = { shop: [] }, action) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return { loading: true, shop: [] };
    case SHOP_DETAILS_SUCCESS:
      return {
        loading: false,
        shop: action.payload,
      };
    case SHOP_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const shopCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_CREATE_REQUEST:
      return { loading: true };
    case SHOP_CREATE_SUCCESS:
      return { loading: false, success: true, shop: action.payload };
    case SHOP_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const shopDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_DELETE_REQUEST:
      return { loading: true };
    case SHOP_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SHOP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
