import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Course } from 'src/app/interfaces';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() course: Course;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDelete = new EventEmitter<string>();

  constructor() {}
  ngOnDestroy(): void {
    console.log('Destroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes', changes);
  }

  ngOnInit(): void {
    console.log('Init');
  }

  deleteHandler(): void {
    this.onDelete.emit(this.course.id);
  }
}
