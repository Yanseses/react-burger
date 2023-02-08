import { getCookie } from '../../utils/cookie';
import { Middleware } from "redux";
import { 
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_OPEN, 
  WS_SEND_MESSAGE 
} from '../actionTypes/ws';
import { 
  wsConnectionClosed, 
  wsConnectionError, 
  wsConnectionSuccess, 
  wsGetMessage 
} from '../actions/ws';

enum WSStatus {
  СLOSE_NORMAL = 1000,
  CLOSE_GOING_AWAY = 1001,
  CLOSE_PROTOCOL_ERROR = 1002,
  CLOSE_UNSUPPORTED = 1003,
  CLOSED_NO_STATUS = 1005
}

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
          if(event.code !== WSStatus.СLOSE_NORMAL){
            dispatch(wsConnectionClosed());
          }
        };

        if (type === WS_SEND_MESSAGE) {
          const token = getCookie('accessToken');
          const message = { ...payload, token: token };
          socket.send(JSON.stringify(message));
        }

        if (type === WS_CONNECTION_CLOSED) {
          dispatch(wsConnectionClosed());
        }
      }

      next(action);
    };
  };
};