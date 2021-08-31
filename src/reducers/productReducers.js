import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.data,
        pages: action.payload.last_page,
        page: action.payload.current_page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return { loading: true, products: [] };

    case SEARCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.data,
        pages: action.payload.last_page,
        page: action.payload.current_page,
      };
    case SEARCH_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loadingproductDetails: true, product: [] };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loadingproductDetails: false,
        product: action.payload.data,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loadingproductDetails: false,
        errorproductDetails: action.payload,
      };
    default:
      return state;
  }
};
