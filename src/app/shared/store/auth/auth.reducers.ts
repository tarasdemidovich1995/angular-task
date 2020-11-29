import { User } from 'src/app/interfaces';
import { AuthActions, AuthActionsType } from './auth.actions';

export const AUTH_REDUCER_NODE = 'auth';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionsType.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionsType.CLEAR_USER: {
      return {
        ...state,
        user: null
      };
    }
    default:
      return state;
  }
};
