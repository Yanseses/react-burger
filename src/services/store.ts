import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { socketMiddleware } from './middlewares/socketMiddleware';
import { WS_URL } from '../utils/constants';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_OPEN,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './actionTypes/ws';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// old-store
export const store = createStore(rootReducer, enhancer);

// new store
const wsActions = {
  wsInit: WS_CONNECTION_OPEN,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const initStore = (initialState = {}) =>
createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunkMiddleware, socketMiddleware(WS_URL, wsActions)))
);