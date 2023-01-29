import { getCookie } from '../../utils/cookie';
import { request } from '../api';
import { v4 as uuidv4 } from 'uuid';
import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_FAILED,
  GET_INGRIDIENTS_SUCCESS,
  ORDER_MAIN_CHANGE,
  ORDER_BUNS_CHANGE,
  ORDER_MAIN_DELETE,
  ORDER_MOVE_INGRIDIENT,
  ORDER_REQUEST,
  ORDER_FAILED,
  ORDER_SUCCESS,
  ORDER_CLEAR,
  TAB_SWITCH,
  ADD_MODAL_INGRIDIENTS,
  ORDER_CHANGE_PRICE
} from '../constants/main';
import { IIngridient } from '../../utils/types';
import { AppDispatch } from '../types';

interface IIngridientsResponse {
  data: IIngridient[];
  statusText: string
}

type TOrder = {
  createdAt: string,
  ingredients: IIngridient[],
  name: string,
  number: number,
  price: number,
  status: string,
  updatedAt: string,
  _id: string
}

interface IAproveOrderResponse {
  name: string;
  order: TOrder;
  statusText?: string;
}

export interface IIngridientsRequest {
  readonly type: typeof GET_INGRIDIENTS_REQUEST
}

export interface IIngridientsFailed {
  readonly type: typeof GET_INGRIDIENTS_FAILED
}

export interface IIngridientsSuccess {
  readonly type: typeof GET_INGRIDIENTS_SUCCESS;
  ingridients: ReadonlyArray<IIngridient>
}

export interface IOrderRequest {
  readonly type: typeof ORDER_REQUEST
}

export interface IOrderFailed {
  readonly type: typeof ORDER_FAILED
}

export interface IOrderSuccess {
  readonly type: typeof ORDER_SUCCESS;
  orderNumber: number 
}

export interface IOrderClear {
  readonly type: typeof ORDER_CLEAR
}

export interface IOrderMainChange {
  readonly type: typeof ORDER_MAIN_CHANGE;
  payload: {
    data: IIngridient,
    id: string
  }
}

export interface IOrderBunsChange {
  readonly type: typeof ORDER_BUNS_CHANGE;
  data: IIngridient
}

export interface IOrderMainDelete {
  readonly type: typeof ORDER_MAIN_DELETE;
  deleteIngridient: string
}

export interface IOrderMoveIngridient {
  readonly type: typeof ORDER_MOVE_INGRIDIENT;
  dragIndex: number;
  hoverIndex: number;
}

export interface ITabSwitch {
  readonly type: typeof TAB_SWITCH;
  tab: string
}

export interface IAddModalIngridient {
  readonly type: typeof ADD_MODAL_INGRIDIENTS;
  data: IIngridient
}

export interface IOrderChangePrice {
  readonly type: typeof ORDER_CHANGE_PRICE
}

export type TMainActions = IIngridientsRequest
  | IIngridientsFailed
  | IIngridientsSuccess
  | IOrderRequest
  | IOrderFailed
  | IOrderSuccess 
  | IOrderClear
  | IOrderMainChange
  | IOrderBunsChange
  | IOrderMainDelete
  | IOrderMoveIngridient
  | ITabSwitch
  | IAddModalIngridient
  | IOrderChangePrice

export function getIngridientsData() {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    });
    request<IIngridientsResponse>('/ingredients')
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
  
export function approveOrderNumber(data: { ingridients: IIngridient[] }){
  return function(dispatch: AppDispatch) {
    dispatch({
      type: ORDER_REQUEST
    });
    request<IAproveOrderResponse>('/orders', {
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
          return Promise.reject(`Ошибка ${res.statusText}`)
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

export function addIngridientOrder(item: IIngridient){
  return {
    type: ORDER_MAIN_CHANGE,
    payload: {
      data: item,
      id: uuidv4(),
    }
  }
}