import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appDateStyle]',
})
export class DateStyleDirective {
  @Input() set appDateStyle(date: moment.Moment) {
    const currentDate = moment();
    const freshDate = moment().subtract(14, 'days');
    let icon;
    let color;
    if (date < currentDate && date >= freshDate) {
      color = '#67a300';
      icon = this.renderer.createText('event_available');
    } else if (date > currentDate) {
      color = '#f84049';
      icon = this.renderer.createText('event_busy');
    } else {
      icon = this.renderer.createText('event');
      color = '#858997';
    }
    this.renderer.appendChild(this.elRef.nativeElement, icon);
    this.renderer.setStyle(this.elRef.nativeElement, 'color', color);
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
}
