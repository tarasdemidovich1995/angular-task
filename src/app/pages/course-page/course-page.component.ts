import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Course } from 'src/app/interfaces';
import { ConfirmModalService } from 'src/app/services/confirm-modal.service';
import { CoursesService } from 'src/app/services/courses.service';

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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
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
