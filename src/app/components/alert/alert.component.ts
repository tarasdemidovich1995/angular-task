import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 2000;
  public text: string;
  public type = 'success';
  public aSub: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.pipe(
      tap((alert) => {
        this.text = alert.text;
        this.type = alert.type;
      }),
      debounceTime(this.delay)
    ).subscribe(() => {
      this.text = '';
      this.type = '';
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
