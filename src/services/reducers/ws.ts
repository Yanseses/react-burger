import { IWsOrder } from "../../utils/types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_OPEN, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actionTypes/ws";
import { TWsActions } from "../actions/ws";

interface IWsState {
  wsConnection: boolean,
  wsConnected: boolean,
  connectionError: string,
  totalToday: number,
  totalAll: number,
  orders: IWsOrder[],
  readyOrders: number[],
  waitingOrders: number[],
  orderModal: null | IWsOrder
}

const initialState: IWsState = {
  wsConnection: false,
  wsConnected: false,
  connectionError: '',
  totalToday: 0,
  totalAll: 0,
  readyOrders: [],
  waitingOrders: [],
  orders: [],
  orderModal: null
}

export const wsState = (state = initialState, action: TWsActions) => {
  switch(action.type){
    case WS_CONNECTION_OPEN: {
      return {
        ...state,
        wsConnection: true
      }
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnection: false,
        wsConnected: true
      }
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        totalToday: action.payload.totalToday,
        totalAll: action.payload.total,
        readyOrders: action.payload.orders
          .filter((el: IWsOrder) => el.status === 'done')
          .map((el: IWsOrder) => el.number),
        waitingOrders: action.payload.orders
          .filter((el: IWsOrder) => el.status === 'pending' || el.status === 'created')
          .map((el: IWsOrder) => el.number)
      }
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false
      }
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false
      }
    }
    default: {
      return state
    }
  }
}