import { ActionReducerMap } from '@ngrx/store';
import { alertReducer, AlertState, ALERT_REDUCER_NODE } from './alert/alert.reducers';
import { authReducer, AuthState, AUTH_REDUCER_NODE } from './auth/auth.reducers';

export interface State {
  [AUTH_REDUCER_NODE]: AuthState;
  [ALERT_REDUCER_NODE]: AlertState;
}

export const reducers: ActionReducerMap<State> = {
  [AUTH_REDUCER_NODE]: authReducer,
  [ALERT_REDUCER_NODE]: alertReducer,
};
