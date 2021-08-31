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
} from '../constants/variationConstants';

export const variationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIATION_CREATE_REQUEST:
      return { loading: true };
    case VARIATION_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case VARIATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addVariationImageReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIATION_IMAGE_REQUEST:
      return { loading: true };
    case VARIATION_IMAGE_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case VARIATION_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const singleVariationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_VARIATION_CREATE_REQUEST:
      return { loading: true };
    case SINGLE_VARIATION_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case SINGLE_VARIATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const variationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIATION_DELETE_REQUEST:
      return { loading: true };
    case VARIATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case VARIATION_DELETE_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const variationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIATION_UPDATE_REQUEST:
      return { loading: true };
    case VARIATION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case VARIATION_UPDATE_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const variationImageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIATION_IMAGE_DELETE_REQUEST:
      return { loading: true };
    case VARIATION_IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case VARIATION_IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};
