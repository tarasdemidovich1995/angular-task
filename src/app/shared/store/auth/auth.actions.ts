import { ActionPayload, User } from 'src/app/interfaces';

export enum AuthActionsType {
  UPDATE_USER = '[AUTH] update user',
  CLEAR_USER = '[AUTH] clear user',
  LOAD_USER = '[AUTH] load user'
}

export type AuthActions =
  ActionPayload<AuthActionsType.UPDATE_USER, User>
  | ActionPayload<AuthActionsType.CLEAR_USER, null>;

