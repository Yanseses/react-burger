import { IIngridient } from '../../utils/types';
import { TMainActions } from '../actions/main';
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
  ADD_MODAL_INGRIDIENTS,
  ORDER_CHANGE_PRICE
} from '../actionTypes/main';

export type TOrderData = {
  buns: null | IIngridient,
  main: Array<IIngridient>,
}

export type TOrder = {
  request: boolean,
  failed: boolean,
  error: string,
  price: number,
  data: TOrderData,
  successNumber: number
}

export type TIngridients = {
  request: boolean,
  failed: boolean,
  error: string,
  data: Array<IIngridient>
}

export type TMainState = {
  ingridients: TIngridients,
  order: TOrder,
  modal: null | IIngridient
}

export const mainInitialState = {
  ingridients: {
    request: false,
    failed: false,
    error: '',
    data: []
  },
  order: {
    request: false,
    failed: false,
    error: '',
    price: 0,
    data: {
      buns: null,
      main: [],
    },
    successNumber: 0
  },
  modal: null
};

export const mainStore = (state: TMainState = mainInitialState, action: TMainActions) => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          request: true
        }
      }
    }
    case GET_INGRIDIENTS_FAILED: {
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case GET_INGRIDIENTS_SUCCESS: {
      return {
        ...state,
        ingridients: {
          request: false,
          failed: false,
          error: '',
          data: action.payload.map((el: IIngridient) => ({...el, counter: 0}))
        }
      }
    }
    case ORDER_CHANGE_PRICE: {
      const buns = state.order.data.buns 
        ? state.order.data.buns.price * 2 
        : 0;
      const main = state.order.data.main.length > 0 
        ? state.order.data.main.reduce((acc: number, num: IIngridient) => acc + num.price, 0) 
        : 0
      return {
        ...state,
        order: {
          ...state.order,
          price: main + buns
        }
      }
    }
    case ORDER_REQUEST: {
      return {
        ...state,
        order: {
          ...state.order,
          request: true,
          successNumber: 0
        }
      }
    }
    case ORDER_FAILED: {
      return {
        ...state,
        order: {
          ...state.order,
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case ORDER_CLEAR: {
      return {
        ...state,
        order: {
          ...state.order,
          data: {
            buns: null,
            main: [],
          },
          price: 0
        },
        ingridients: {
          ...state.ingridients,
          data: state.ingridients.data.map((element: IIngridient) => {
            if(element.counter > 0){
              element.counter = 0
            }
            return element
          })
        }
      }
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        order: {
          ...state.order,
          request: false,
          failed: false,
          error: '',
          successNumber: action.payload
        }
      }
    }
    case ADD_MODAL_INGRIDIENTS: {
      return {
        ...state,
        modal: action.payload
      }
    }
    case ORDER_MAIN_CHANGE: {
      if(action.payload.data.id){
        return state;
      }
      return {
        ...state,
        order: {
          ...state.order,
          data: {
            ...state.order.data,
            main: [...state.order.data.main, {...action.payload.data, id: action.payload.id }]
          }
        },
        ingridients: {
          ...state.ingridients,
          data: state.ingridients.data.map((el: IIngridient) => {
            if(el._id === action.payload.data._id){
              el.counter++
            }
            return el;
          })
        }
      }
    }
    case ORDER_MAIN_DELETE: {
      const ingridientId = state.order.data.main.find((el: IIngridient) => el.id === action.payload);
      return {
        ...state,
        order: {
          ...state.order,
          data: {
            ...state.order.data,
            main: state.order.data.main.filter((el: IIngridient) => action.payload !== el.id)
          }
        },
        ingridients: {
          ...state.ingridients,
          data: state.ingridients.data.map((el: IIngridient) => {
            if(ingridientId && el._id === ingridientId._id){
              el.counter--
            }
            return el
          })
        }
      }
    }
    case ORDER_BUNS_CHANGE: {
      return {
        ...state,
        order: {
          ...state.order,
          data: {
            ...state.order.data,
            buns: action.payload
          }
        },
        ingridients: {
          ...state.ingridients,
          data: state.ingridients.data.map((el: IIngridient) => {
            if(el.type === 'bun'){
              if(el._id === action.payload._id){
                if(el.counter === 0){
                  el.counter++
                }
              } else if(el.counter > 0) {
                el.counter--
              }
              return el;
            }
            return el;
          })
        }
      }
    }
    case ORDER_MOVE_INGRIDIENT: {
      const dragItem = state.order.data.main[action.payload.dragIndex];
      const hoverItem = state.order.data.main[action.payload.hoverIndex];
      const changedOrder = state.order.data.main;
      changedOrder[action.payload.dragIndex] = hoverItem;
      changedOrder[action.payload.hoverIndex] = dragItem;
      return {
        ...state,
        order: {
          ...state.order,
          main: changedOrder
        }
      }
    }
    default: {
      return state;
    }
  }
};