import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { CoursesService } from 'src/app/course/shared/services/courses.service';

import { Course } from 'src/app/interfaces';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {

  public searchStream$ = new Subject<string>();
  private sub: Subscription;

  constructor(
    public coursesService: CoursesService,
    private modal: ConfirmModalService
  ) {}

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public ngOnInit(): void {
    this.coursesService.updateState('');
    this.sub = this.searchStream$.pipe(
      debounceTime(700)
    ).subscribe((str) => {
      this.coursesService.updateState(str);
    });
  }

  public deleteCourse(course: Course): void {
    this.modal.showModal(
      'Delete course?',
      `Are you really want to delete ${course.name}?`,
      this.coursesService.remove(course.id)
    );
  }
}
