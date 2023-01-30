import { getCookie } from "../../utils/cookie";
import { IIngridient } from "../../utils/types";
import { request } from "../api";
import { AppDispatch } from "../types";
import { 
  ingridientsFailed, 
  ingridientsRequest, 
  ingridientsSuccess, 
  orderClear, 
  orderFailed, 
  orderRequest,
  orderSuccess
} from "../actions/main";

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

export function getIngridientsData() {
  return function(dispatch: AppDispatch) {
    dispatch(ingridientsRequest());
    request<IIngridientsResponse>('/ingredients')
      .then(res => {
        if (res && res.success) {
          dispatch(ingridientsSuccess(res.data));
        } else {
          return Promise.reject(`Ошибка ${res.statusText}`)
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(ingridientsFailed());
      })
    }
  }
  
export function approveOrderNumber(data: { ingridients: IIngridient[] }){
  return function(dispatch: AppDispatch) {
    dispatch(orderRequest());
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
          dispatch(orderSuccess(res.order.number))
          dispatch(orderClear())
        } else {
          return Promise.reject(`Ошибка ${res.statusText}`)
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(orderFailed());
      })
    }
  }