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
  wsConnected: boolean,
  connectionsError: string,
  totalToday: number,
  total: number,
  orders: IWsOrder[] | []
}

const initialState: IWsState = {
  wsConnected: false,
  connectionsError: '',
  totalToday: 0,
  total: 0,
  orders: [],
}

export const wsState = (state = initialState, action: TWsActions) => {
  switch(action.type){
    default: {
      return state
    }
  }
}