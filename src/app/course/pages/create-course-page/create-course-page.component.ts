import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { ActionPayload, CourseRequest } from 'src/app/interfaces';
import { CoursesState } from '../../shared/store/course.reducers';
import { coursesAuthorsSelector } from '../../shared/store/course.selectors';
import { CoursesActionsTypes } from '../../shared/store/course.actions';
import { CourseFormComponent } from '../../shared/components/course-form/course-form.component';
import * as moment from 'moment';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent implements OnInit {
  @ViewChild(CourseFormComponent) courseForm: CourseFormComponent;

  public newCourse: CourseRequest = {
    id: Math.floor(Math.random() * 10000),
    name: '',
    date: moment().format('YYYY-MM-DD'),
    description: '',
    length: null,
    authors: [],
  };
  public authors$ = this.store$.pipe(select(coursesAuthorsSelector));

  constructor(
    private store$: Store<CoursesState>,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.authors$.subscribe((authors) => {
      if (!authors.length) {
        this.store$.dispatch(new ActionPayload(CoursesActionsTypes.LOAD_AUTHORS));
      }
    });
  }

  public save(): void {
    this.store$.dispatch(
      new ActionPayload(CoursesActionsTypes.CREATE_COURSE, this.courseForm.getUpdatedCourse())
    );
    this.router.navigate(['/courses']);
  }
}
