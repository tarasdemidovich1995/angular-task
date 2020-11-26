import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

import { AlertService } from 'src/app/shared/services/alert.service';
import { EAlert } from 'src/app/interfaces';
import { BASE_ALERT_TIME } from 'src/app/config';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = BASE_ALERT_TIME;
  public types = EAlert;
  public text: string;
  public type: EAlert | null = EAlert.SUCCESS;
  public aSub: Subscription;

  constructor(private alertService: AlertService) {}

  public ngOnInit(): void {
    this.aSub = this.alertService.alert$.pipe(
      tap((alert) => {
        this.text = alert.text;
        this.type = alert.type;
      }),
      debounceTime(this.delay)
    ).subscribe(() => {
      this.text = null;
      this.type = null;
    });
  }

  public ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
