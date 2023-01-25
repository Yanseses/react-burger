import { getCookie } from '../../utils/cookie';
import { request } from '../api';
import { v4 as uuidv4 } from 'uuid';
import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_FAILED,
  GET_INGRIDIENTS_SUCCESS,
  ORDER_MAIN_CHANGE,
  ORDER_REQUEST,
  ORDER_FAILED,
  ORDER_SUCCESS,
  ORDER_CLEAR,
} from '../constants/ingridients';

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
          return Promise.reject(`Ошибка ${res.statusText}`)
        }
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: GET_INGRIDIENTS_FAILED
        });
      })
    }
  }
  
export function approveOrderNumber(data){
  return function(dispatch) {
    dispatch({
      type: ORDER_REQUEST
    });
    request('/orders', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('accessToken')
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
          return Promise.reject(`Ошибка ${res.status}`)
        }
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: ORDER_FAILED
        });
      })
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