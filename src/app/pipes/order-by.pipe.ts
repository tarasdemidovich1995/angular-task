import { Pipe, PipeTransform } from '@angular/core';
import { Course, Direction } from '../interfaces';
import * as moment from 'moment';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[], direction: Direction = 'direct'): Course[] {
    if (direction === 'direct') {
      return courses.sort((course1, course2) => {
        return course1.date.valueOf() - course2.date.valueOf();
      });
    } else {
      return courses.sort((course1, course2) => {
        return course2.date.valueOf() - course1.date.valueOf();
      });
    }
  }
}
