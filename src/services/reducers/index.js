import { combineReducers } from 'redux';
import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_FAILED,
  GET_INGRIDIENTS_SUCCESS,
  ORDER_INGRIDIENT_DELETED,
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
        ingridients: action.ingridients
      }
    }
    case ORDER_INGRIDIENT_DELETED: {
      return {
        ...state,
        order: {
          ...state.order,
          main: action.main
        }
      }
    }
    case ORDER_CHANGE_PRICE: {
      return {
        ...state,
        orderPrice: action.price
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
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  main: mainStore,
});