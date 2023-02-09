import { IWsOrder } from '../../utils/types';
import {
  WS_CONNECTION_OPEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_ADD_MODAL_ORDER
} from '../actionTypes/ws';

interface IOrderMessage {
  orders: IWsOrder[],
  total: number,
  totalToday: number
}

interface IWsConnectionOpen {
  readonly type: typeof WS_CONNECTION_OPEN,
  payload: string
}

interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS,
  payload: Event
}

interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR,
}

interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED,
}

interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE,
  payload: IOrderMessage
}

interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE,
  payload: any
}

interface IWsAddModalOrder {
  readonly type: typeof WS_ADD_MODAL_ORDER,
  payload: IWsOrder
}

export type TWsActions = IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage
  | IWsConnectionOpen
  | IWsAddModalOrder

export const wsConnectionOpen = (url: string): IWsConnectionOpen => {
  return {
    type: WS_CONNECTION_OPEN,
    payload: url
  }
}

export const wsConnectionSuccess = (event: Event): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
    payload: event
  }
}

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
  }
}

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  }
}

export const wsGetMessage = (message: any): IWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  }
}

export const wsSendMessage = (message: any): IWsSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};

export const wsAddModalOrder = (order: IWsOrder): IWsAddModalOrder => {
  return {
    type: WS_ADD_MODAL_ORDER,
    payload: order
  };
};