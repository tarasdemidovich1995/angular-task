import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../interfaces';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(courses: Course[], search: string): Course[] {
    if (!search.trim()) {
      return courses;
    }
    return courses.filter((course) => {
      return course.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
