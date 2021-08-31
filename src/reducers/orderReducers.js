import {
  ORDERSTATUS_FAIL,
  ORDERSTATUS_REQUEST,
  ORDERSTATUS_SUCCESS,
  ORDER_DETAILS_LIST_FAIL,
  ORDER_DETAILS_LIST_REQUEST,
  ORDER_DETAILS_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../constants/orderConstants";

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true, orders: [] };

    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.data,
        pages: action.payload.last_page,
        page: action.payload.current_page,
      };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsListReducer = (
  state = { ordersDetails: [] },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_LIST_REQUEST:
      return { loading: true, orders: [] };
    case ORDER_DETAILS_LIST_SUCCESS:
      return {
        loading: false,
        ordersDetails: action.payload.data,
      };
    case ORDER_DETAILS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderStatusUpdateReducer = (
  state = { orderStatus: [] },
  action
) => {
  switch (action.type) {
    case ORDERSTATUS_REQUEST:
      return { loading: true, orderStatus: [] };
    case ORDERSTATUS_SUCCESS:
      return {
        loading: false,
        orderStatus: action.payload.data,
      };
    case ORDERSTATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
