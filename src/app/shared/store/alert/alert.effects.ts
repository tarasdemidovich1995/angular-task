import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { BASE_ALERT_TIME } from 'src/app/config';
import { ActionPayload } from 'src/app/interfaces';
import { AlertActionTypes } from './alert.actions';

@Injectable()
export class AlertEffects {
  constructor(
    private actions$: Actions,
  ) {}

  @Effect()
  public hideLoader$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(
        AlertActionTypes.SUCCESS,
        AlertActionTypes.WARNING,
        AlertActionTypes.DANGER
      ),
      debounceTime(BASE_ALERT_TIME),
      map(() => {
        return new ActionPayload(AlertActionTypes.HIDE);
      })
    );
  }
}
