import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { CoursesService } from 'src/app/course/shared/services/courses.service';

import { ActionPayload, Course } from 'src/app/interfaces';
import { select, Store } from '@ngrx/store';
import { CoursesState } from '../../shared/store/course.reducers';
import { coursesCountSelector, coursesListSelector, coursesPageSelector } from '../../shared/store/course.selectors';
import { CoursesActionsTypes } from '../../shared/store/course.actions';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public searchStream$ = new Subject<string>();
  public list$ = this.store$.pipe(select(coursesListSelector));
  public page$ = this.store$.pipe(select(coursesPageSelector));
  public count$ = this.store$.pipe(select(coursesCountSelector));

  constructor(
    public coursesService: CoursesService,
    private store$: Store<CoursesState>,
    private modal: ConfirmModalService
  ) {}

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public ngOnInit(): void {
    this.store$.dispatch(new ActionPayload(CoursesActionsTypes.CHANGE_QUERY, ''));
    this.sub = this.searchStream$.pipe(
      debounceTime(700)
    ).subscribe((str) => {
      this.store$.dispatch(new ActionPayload(CoursesActionsTypes.CHANGE_QUERY, str));
    });
  }

  public openModal(course: Course): void {
    this.modal.showModal(
      'Delete course?',
      `Are you really want to delete ${course.name}?`,
      this.deleteCourse.bind(this, course.id)
    );
  }

  public deleteCourse(id: number): void {
    this.store$.dispatch(new ActionPayload(CoursesActionsTypes.DELETE_COURSE, id));
  }

  public loadPage(page: number): void {
    this.store$.dispatch(new ActionPayload(CoursesActionsTypes.CHANGE_PAGE, page));
  }
}
