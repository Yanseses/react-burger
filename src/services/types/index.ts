import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TMainActions } from '../actions/main';
import { TAuthActions } from '../actions/auth';
import { TWsActions } from '../actions/ws';

export type TApplicationActions = TMainActions | TAuthActions | TWsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;