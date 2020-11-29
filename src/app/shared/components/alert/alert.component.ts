import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AlertState } from '../../store/alert/alert.reducers';
import { alertSelector } from '../../store/alert/alert.selectors';
import { AlertActionTypes } from '../../store/alert/alert.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  public types = AlertActionTypes;
  public alert$: Observable<AlertState> = this.store$.pipe(select(alertSelector));
  constructor(private store$: Store<AlertState>) {}
}
