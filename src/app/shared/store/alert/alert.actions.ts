import { ActionPayload } from 'src/app/interfaces';

export enum AlertActionTypes {
  SUCCESS = '[Alert] success',
  WARNING = '[Alert] warning',
  DANGER = '[Alert] danger',
  HIDE = '[Alert] hide'
}

export type AlertActions =
  ActionPayload<AlertActionTypes.SUCCESS, string>
  | ActionPayload<AlertActionTypes.WARNING, string>
  | ActionPayload<AlertActionTypes.DANGER, string>
  | ActionPayload<AlertActionTypes.HIDE, null>;
