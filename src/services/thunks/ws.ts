import { IWsOrder } from "../../utils/types";
import { wsAddModalOrder } from "../actions/ws";
import { request } from "../api";
import { AppDispatch } from "../types";

type TOrderResponce = {
  orders: IWsOrder[],
  statusText?: string
}

export function getOrderData(number: number) {
  return function(dispatch: AppDispatch) {
    request<TOrderResponce>(`/orders/${number}`)
      .then(res => {
        if (res && res.success) {
          dispatch(wsAddModalOrder(res.orders[0]));
        } else {
          return Promise.reject(`Error: ${res.statusText}`)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }