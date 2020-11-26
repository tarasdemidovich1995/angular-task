import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Alert, EAlert } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alert$ = new Subject<Alert>();

  public success(text: string): void {
    this.alert$.next({ type: EAlert.SUCCESS, text });
  }

  public warning(text: string): void {
    this.alert$.next({ type: EAlert.WARNING, text });
  }

  public danger(text: string): void {
    this.alert$.next({ type: EAlert.DANGER, text });
  }
}
