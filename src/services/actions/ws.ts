import { IWsOrder } from '../../utils/types';
import {
  WS_CONNECTION_OPEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_ADD_MODAL_ORDER,
  MODAL_ORDER_REQUEST,
  MODAL_ORDER_FAILED,
  MODAL_ORDER_SUCCESS
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

interface IGetOrderRequest {
  readonly type: typeof MODAL_ORDER_REQUEST
}

interface IGetOrderFailed {
  readonly type: typeof MODAL_ORDER_FAILED
}

interface IGetOrderSuccess {
  readonly type: typeof MODAL_ORDER_SUCCESS,
  payload: IWsOrder
}

export type TWsActions = IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage
  | IWsConnectionOpen
  | IWsAddModalOrder
  | IGetOrderRequest
  | IGetOrderFailed
  | IGetOrderSuccess

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

export const getOrderRequest = (): IGetOrderRequest => {
  return {
    type: MODAL_ORDER_REQUEST
  };
};

export const getOrderFailed = (): IGetOrderFailed => {
  return {
    type: MODAL_ORDER_FAILED
  };
};

export const getOrderSuccess = (order: IWsOrder): IGetOrderSuccess => {
  return {
    type: MODAL_ORDER_SUCCESS,
    payload: order
  };
};