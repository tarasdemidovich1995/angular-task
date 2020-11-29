import { Pipe, PipeTransform } from '@angular/core';
import { Course, Direction } from 'src/app/interfaces';
import { CoursesService } from '../services/courses.service';

@Pipe({
  name: 'orderBy',
  pure: false,
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[], direction: Direction = 'direct'): Course[] {
    if (direction === 'direct') {
      return courses.sort((course1, course2) => {
        return +course1.date - +course2.date;
      });
    } else {
      return courses.sort((course1, course2) => {
        return +course2.date - +course1.date;
      });
    }
  }
}
