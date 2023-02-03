import { WS_CONNECTION_CLOSED, WS_CONNECTION_OPEN, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actionTypes/ws";
import { TWsActions } from "../actions/ws";

interface IWsOrder {
  ingridients: string[],
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string
}

interface IWsState {
  wsConnection: boolean,
  wsConnected: boolean,
  connectionsError: string,
  totalToday: number,
  totalAll: number,
  orders: IWsOrder[] | [],
  readyOrders: number[],
  waitingOrders: number[]
}

const initialState: IWsState = {
  wsConnection: false,
  wsConnected: false,
  connectionsError: '',
  totalToday: 0,
  totalAll: 0,
  readyOrders: [],
  waitingOrders: [],
  orders: [],
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
          .filter((el: any) => el.status === 'done')
          .map((el: any) => el.number),
        waitingOrders: action.payload.orders
          .filter((el: any) => el.status === 'pending' || el.status === 'created')
          .map((el: any) => el.number)
      }
    }
    case WS_CONNECTION_CLOSED: {
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