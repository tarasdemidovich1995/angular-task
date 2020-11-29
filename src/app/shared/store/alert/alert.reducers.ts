import { AlertActions, AlertActionTypes } from './alert.actions';

export const ALERT_REDUCER_NODE = 'alert';

export interface AlertState {
  message: string;
  class: AlertActionTypes.SUCCESS | AlertActionTypes.WARNING | AlertActionTypes.DANGER;
}

const initialState: AlertState = {
  message: '',
  class: null
};

export const alertReducer = (state = initialState, action: AlertActions) => {
  switch (action.type) {
    case AlertActionTypes.SUCCESS:
      return {
        ...state,
        message: action.payload,
        class: action.type,
      };
    case AlertActionTypes.WARNING:
      return {
        ...state,
        message: action.payload,
        class: action.type,
      };
    case AlertActionTypes.DANGER:
      return {
        ...state,
        message: action.payload,
        class: action.type,
      };
    case AlertActionTypes.HIDE:
      return initialState;
    default:
      return state;
  }
};
