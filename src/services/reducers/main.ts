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
  TAB_SWITCH,
  ADD_MODAL_INGRIDIENTS,
  ORDER_CHANGE_PRICE
} from '../actionTypes/main';

export type TOrder = {
  buns: null | IIngridient;
  main: Array<IIngridient>
}

export type TMainState = {
  ingridients: IIngridient[];
  ingridientsRequest: boolean;
  ingridientsFailed: boolean;
  orderPrice: number;
  orderRequest: boolean;
  orderFailed: boolean;
  activeTab: string;
  orderNumber: number;
  ingridientModal: IIngridient | null;
  order: TOrder;
}

const mainInitialState = {
  ingridients: [],
  ingridientsRequest: false,
  ingridientsFailed: false,
  ingridientModal: null,
  orderPrice: 0,
  orderRequest: false,
  orderFailed: false,
  order: {
    buns: null,
    main: []
  },
  activeTab: 'bun',
  orderNumber: 0
};

export const mainStore = (state: TMainState = mainInitialState, action: TMainActions) => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        ingridientsRequest: true
      }
    }
    case GET_INGRIDIENTS_FAILED: {
      return {
        ...state,
        ingridientsFailed: true
      }
    }
    case GET_INGRIDIENTS_SUCCESS: {
      return {
        ...state,
        ingridientsRequest: false,
        ingridientsFailed: false,
        ingridients: action.payload.map((el: IIngridient) => {
          return {
            ...el,
            counter: 0
          }
        })
      }
    }
    case ORDER_CHANGE_PRICE: {
      const buns = state.order.buns 
        ? state.order.buns.price * 2 
        : 0;
      const main = state.order.main.length > 0 
        ? state.order.main.reduce((acc: number, num: IIngridient) => acc + num.price, 0) 
        : 0
      return {
        ...state,
        orderPrice: main + buns
      }
    }
    case TAB_SWITCH: {
      return {
        ...state,
        activeTab: action.payload
      };
    }
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true
      }
    }
    case ORDER_CLEAR: {
      return {
        ...state,
        order: {
          buns: null,
          main: []
        },
        ingridients: state.ingridients.map((element: IIngridient) => {
          if(element.counter > 0){
            element.counter = 0
          }
          return element
        }),
        orderPrice: 0
      }
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderNumber: action.payload
      }
    }
    case ADD_MODAL_INGRIDIENTS: {
      return {
        ...state,
        ingridientModal: action.payload
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
          main: [...state.order.main, {...action.payload.data, id: action.payload.id }]
        },
        ingridients: state.ingridients.map((el: IIngridient) => {
          if(el._id === action.payload.data._id){
            el.counter++
            return el;
          }
          return el;
        })
      }
    }
    case ORDER_MAIN_DELETE: {
      const ingridientId = state.order.main.find((el: IIngridient) => el.id === action.payload);
      return {
        ...state,
        order: {
          ...state.order,
          main: state.order.main.filter((el: IIngridient) => action.payload !== el.id)
        },
        ingridients: state.ingridients.map((el: IIngridient) => {
          if(ingridientId && el._id === ingridientId._id){
            el.counter--
            return el;
          }
          return el
        })
      }
    }
    case ORDER_BUNS_CHANGE: {
      return {
        ...state,
        order: {
          ...state.order,
          buns: action.payload
        },
        ingridients: state.ingridients.map((el: IIngridient) => {
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
    case ORDER_MOVE_INGRIDIENT: {
      const dragItem = state.order.main[action.payload.dragIndex];
      const hoverItem = state.order.main[action.payload.hoverIndex];
      const changedOrder = state.order.main;
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