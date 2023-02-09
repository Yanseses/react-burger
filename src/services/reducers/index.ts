import { combineReducers } from 'redux';
import { authStore } from './auth';
import { mainStore } from './main';
import { wsState } from './ws';

export const rootReducer = combineReducers({
  main: mainStore,
  auth: authStore,
  ws: wsState
});