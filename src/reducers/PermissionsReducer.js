import {
  PERMISSION_CREATE_FAIL,
  PERMISSION_CREATE_REQUEST,
  PERMISSION_CREATE_SUCCESS,
} from '../constants/permissionConstants';

export const createPermissionReducer = (state = {}, action) => {
  switch (action.type) {
    case PERMISSION_CREATE_REQUEST:
      return { loading: true };
    case PERMISSION_CREATE_SUCCESS:
      return { loading: false, success: true, permissions: action.payload };
    case PERMISSION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
