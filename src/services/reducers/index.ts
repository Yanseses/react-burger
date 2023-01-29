import { combineReducers } from 'redux';
import { authStore } from './auth';
import { mainStore } from './main';

export const rootReducer = combineReducers({
  main: mainStore,
  auth: authStore
});