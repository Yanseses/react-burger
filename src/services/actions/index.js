import { getIngridients, confirmOrder } from '../api';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const ORDER_MAIN_CHANGE = 'ORDER_MAIN_CHANGE';
export const ORDER_BUNS_CHANGE = 'ORDER_BUNS_CHANGE';
export const ORDER_MAIN_DELETE = 'ORDER_MAIN_DELETE';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_FAILED = 'ORDER_FAILED';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const TAB_SWITCH = 'TAB_SWITCH';
export const ADD_MODAL_INGRIDIENTS = 'ADD_MODAL_INGRIDIENTS';
export const ORDER_CHANGE_PRICE = 'ORDER_CHANGE_PRICE';

export function getIngridientsData() {
  return function(dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    });
    getIngridients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGRIDIENTS_SUCCESS,
          ingridients: res.data
        });
      } else {
        dispatch({
          type: GET_INGRIDIENTS_FAILED
        });
      }
    });
  };
}

export function approveOrderNumber(data){
  return function(dispatch) {
    dispatch({
      type: ORDER_REQUEST
    });
    confirmOrder(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: ORDER_SUCCESS,
          orderNumber: res.order.number
        });
      } else {
        dispatch({
          type: ORDER_FAILED
        });
      }
    });
  }
}