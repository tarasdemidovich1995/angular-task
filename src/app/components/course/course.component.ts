import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/interfaces';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})

export class CourseComponent {
  @Input() course: Course;
  @Output() onDelete = new EventEmitter<Course>();

  constructor(private router: Router) {}

  deleteHandler(): void {
    this.onDelete.emit(this.course);
  }

  goToCourse(): void {
    this.router.navigate(['/courses', this.course.id], {
      fragment: this.course.title
    });
  }
}
