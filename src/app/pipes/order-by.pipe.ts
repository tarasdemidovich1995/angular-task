import { Pipe, PipeTransform } from '@angular/core';
import { Course, Direction } from '../interfaces';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[], direction: Direction = 'direct'): Course[] {
    if (direction === 'direct') {
      return courses.sort((course1, course2) => {
        return course1.creationDate.valueOf() - course2.creationDate.valueOf();
      });
    } else {
      return courses.sort((course1, course2) => {
        return course2.creationDate.valueOf() - course1.creationDate.valueOf();
      });
    }
  }
}
