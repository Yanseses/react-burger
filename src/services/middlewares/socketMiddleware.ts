import { getCookie } from '../../utils/cookie';
import { Middleware } from "redux";
import { 
  WS_CONNECTION_OPEN, 
  WS_SEND_MESSAGE 
} from '../actionTypes/ws';
import { 
  wsConnectionClosed, 
  wsConnectionError, 
  wsConnectionSuccess, 
  wsGetMessage 
} from '../actions/ws';

export const socketMiddleware = (): Middleware => {
  return store => {
    let socket: WebSocket | null = null;
    
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_OPEN) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(wsConnectionSuccess(event));
        };

        socket.onerror = event => {
          dispatch(wsConnectionError());
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(wsGetMessage(restParsedData));
        };

        socket.onclose = event => {
          if(event.code !== 1000){
            dispatch(wsConnectionClosed());
          }
        };

        if (type === WS_SEND_MESSAGE) {
          const token = getCookie('accessToken');
          const message = { ...payload, token: token };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};