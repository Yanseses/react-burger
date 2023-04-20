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
} from '../actionTypes/main';
import { IIngridient } from '../../utils/types';

export interface IIngridientsRequest {
  readonly type: typeof GET_INGRIDIENTS_REQUEST
}

export interface IIngridientsFailed {
  readonly type: typeof GET_INGRIDIENTS_FAILED
  payload: string
}

export interface IIngridientsSuccess {
  readonly type: typeof GET_INGRIDIENTS_SUCCESS;
  payload: ReadonlyArray<IIngridient>
}

export interface IOrderRequest {
  readonly type: typeof ORDER_REQUEST
}

export interface IOrderFailed {
  readonly type: typeof ORDER_FAILED,
  payload: string
}

export interface IOrderSuccess {
  readonly type: typeof ORDER_SUCCESS;
  payload: number 
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
  payload: IIngridient
}

export interface IOrderMainDelete {
  readonly type: typeof ORDER_MAIN_DELETE;
  payload: string
}

export interface IOrderMoveIngridient {
  readonly type: typeof ORDER_MOVE_INGRIDIENT;
  payload: {
    dragIndex: number;
    hoverIndex: number;
  }
}

export interface ITabSwitch {
  readonly type: typeof TAB_SWITCH;
  payload: string
}

export interface IAddModalIngridient {
  readonly type: typeof ADD_MODAL_INGRIDIENTS;
  payload: IIngridient
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

export const ingridientsRequest = (): IIngridientsRequest => {
  return {
    type: GET_INGRIDIENTS_REQUEST
  }
}

export const ingridientsFailed = (error: string): IIngridientsFailed => {
  return {
    type: GET_INGRIDIENTS_FAILED,
    payload: error
  }
}

export const ingridientsSuccess = (ingridients: IIngridient[]): IIngridientsSuccess => {
  return {
    type: GET_INGRIDIENTS_SUCCESS,
    payload: ingridients
  }
}

export const orderRequest = (): IOrderRequest => {
  return {
    type: ORDER_REQUEST
  }
}

export const orderFailed = (error: string): IOrderFailed => {
  return {
    type: ORDER_FAILED,
    payload: error
  }
}

export const orderSuccess = (orderNumber: number): IOrderSuccess => {
  return {
    type: ORDER_SUCCESS,
    payload: orderNumber
  }
}

export const orderClear = (): IOrderClear => {
  return {
    type: ORDER_CLEAR
  }
}

export const orderMainChange = (item: IIngridient): IOrderMainChange => {
  return {
    type: ORDER_MAIN_CHANGE,
    payload: {
      data: item,
      id: uuidv4(),
    }
  }
}

export const orderBunsChange = (data: IIngridient): IOrderBunsChange => {
  return {
    type: ORDER_BUNS_CHANGE,
    payload: data
  }
}

export const orderMainDelete = (data: string): IOrderMainDelete => {
  return {
    type: ORDER_MAIN_DELETE,
    payload: data
  }
}

export const orderMoveIngridient = (hoverIndex: number, dragIndex: number): IOrderMoveIngridient => {
  return {
    type: ORDER_MOVE_INGRIDIENT,
    payload: {
      hoverIndex,
      dragIndex
    }
  }
}

export const tabSwitch = (tab: string): ITabSwitch => {
  return {
    type: TAB_SWITCH,
    payload: tab
  }
}

export const addModalIngridient = (data: IIngridient): IAddModalIngridient => {
  return {
    type: ADD_MODAL_INGRIDIENTS,
    payload: data
  }
}

export const orderChangePrice = (): IOrderChangePrice => {
  return {
    type: ORDER_CHANGE_PRICE
  }
}