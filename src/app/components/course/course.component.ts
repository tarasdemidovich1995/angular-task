import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Course } from 'src/app/interfaces';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @Input() course: Course;
  @Output() onDelete = new EventEmitter<string>();

  constructor() {}

  deleteHandler(): void {
    this.onDelete.emit(this.course.id);
  }
}
