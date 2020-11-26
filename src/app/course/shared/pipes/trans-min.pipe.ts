import { Pipe, PipeTransform } from '@angular/core';
import { MINUTES_IN_HOURS } from 'src/app/config';

@Pipe({
  name: 'transMin',
})
export class TransMinPipe implements PipeTransform {
  transform(duration: number): string {
    let result = '';
    const hours = Math.floor(duration / MINUTES_IN_HOURS);
    const mins = duration % MINUTES_IN_HOURS;
    if (hours) {
      result += hours + 'h';
    }
    if (mins) {
      result += ' ' + mins + 'min';
    }
    return result || '0min';
  }
}
