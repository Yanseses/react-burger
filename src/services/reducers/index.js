import { combineReducers } from 'redux';
import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_FAILED,
  GET_INGRIDIENTS_SUCCESS,
  ORDER_MAIN_CHANGE,
  ORDER_BUNS_CHANGE,
  ORDER_MAIN_DELETE,
  ORDER_REQUEST,
  ORDER_FAILED,
  ORDER_SUCCESS,
  TAB_SWITCH,
  ADD_MODAL_INGRIDIENTS,
  ORDER_CHANGE_PRICE
} from '../actions/index';

const initialState = {
  ingridients: [],
  ingridientsRequest: false,
  ingridientsFailed: false,
  ingridientModal: {},
  orderPrice: 0,
  orderRequest: false,
  orderFailed: false,
  order: {
    buns: null,
    main: []
  },
  activeTab: 'bun',
  orderNumber: null
};

export const mainStore = (state = initialState, action) => {
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
        ingridients: action.ingridients.map(el => ({
          ...el,
          counter: 0
        }))
      }
    }
    case ORDER_CHANGE_PRICE: {
      const buns = state.order.buns 
        ? state.order.buns.price * 2 
        : 0;
      const main = state.order.main.length > 0 
        ? state.order.main.reduce((acc, num) => acc + num.price, 0) 
        : 0
      return {
        ...state,
        orderPrice: main + buns
      }
    }
    case TAB_SWITCH: {
      return {
        ...state,
        activeTab: action.tab
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
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderNumber: action.orderNumber
      }
    }
    case ADD_MODAL_INGRIDIENTS: {
      return {
        ...state,
        ingridientModal: action.data
      }
    }
    case ORDER_MAIN_CHANGE: {
      return {
        ...state,
        order: {
          ...state.order,
          // Добавить uuid каждому элементу и сделать их уникальными
          // при удалении опираться на uuid
          main: [...state.order.main, action.data]
        },
        ingridients: state.ingridients.map(el => {
          if(el._id === action.data._id){
            el.counter++
            return el;
          }
          return el;
        })
      }
    }
    case ORDER_MAIN_DELETE: {
      return {
        ...state,
        order: {
          ...state.order,
          main: state.order.main.filter(el => action.deleteIngridient !== el._id)
        },
        ingridients: state.ingridients.map(el => {
          if(el._id == action.deleteIngridient){
            el.counter--
            return el
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
          buns: action.data
        },
        ingridients: state.ingridients.map(el => {
          if(el.type === 'bun'){
            if(el._id === action.data._id){
              if(el.counter == 0){
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
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  main: mainStore,
});