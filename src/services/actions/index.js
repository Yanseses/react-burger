import { request } from '../api';
import { v4 as uuidv4 } from 'uuid';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const ORDER_MAIN_CHANGE = 'ORDER_MAIN_CHANGE';
export const ORDER_BUNS_CHANGE = 'ORDER_BUNS_CHANGE';
export const ORDER_MAIN_DELETE = 'ORDER_MAIN_DELETE';
export const ORDER_MOVE_INGRIDIENT = 'ORDER_MOVE_INGRIDIENT';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_FAILED = 'ORDER_FAILED';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_CLEAR = 'ORDER_CLEAR';
export const TAB_SWITCH = 'TAB_SWITCH';
export const ADD_MODAL_INGRIDIENTS = 'ADD_MODAL_INGRIDIENTS';
export const ORDER_CHANGE_PRICE = 'ORDER_CHANGE_PRICE';

export function getIngridientsData() {
  return function(dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    });
    request('/ingredients')
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGRIDIENTS_SUCCESS,
            ingridients: res.data
          });
        } else {
          dispatch({
            type: GET_INGRIDIENTS_FAILED
          });
          return Promise.reject(`Ошибка ${res.status}`)
        }
      })
      .catch(err => console.log(err))
    }
  }

export function approveOrderNumber(data){
  return function(dispatch) {
    dispatch({
      type: ORDER_REQUEST
    });
    request('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(res => {
        if (res && res.success) {
          dispatch({
            type: ORDER_SUCCESS,
            orderNumber: res.order.number
          })
          dispatch({
            type: ORDER_CLEAR
          })
        } else {
          dispatch({
            type: ORDER_FAILED
          });
          return Promise.reject(`Ошибка ${res.status}`)
        }
      })
      .catch(err => console.log(err))
    }
  }

export function addIngridientOrder(item){
  return {
    type: ORDER_MAIN_CHANGE,
    payload: {
      data: item,
      id: uuidv4(),
    }
  }
}