import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ActionPayload } from 'src/app/interfaces';
import { select, Store } from '@ngrx/store';
import { CoursesState } from '../../shared/store/course.reducers';
import { coursesAuthorsSelector, editedCourseSelector } from '../../shared/store/course.selectors';
import { CoursesActionsTypes } from '../../shared/store/course.actions';
import { CourseFormComponent } from '../../shared/components/course-form/course-form.component';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  @ViewChild(CourseFormComponent) courseForm: CourseFormComponent;

  public editedCourse$ = this.store$.pipe(select(editedCourseSelector));
  public authors$ = this.store$.pipe(select(coursesAuthorsSelector));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<CoursesState>,
  ) {}

  public ngOnInit(): void {
    this.authors$.subscribe((authors) => {
      if (!authors.length) {
        this.store$.dispatch(new ActionPayload(CoursesActionsTypes.LOAD_AUTHORS));
      }
    });
    this.route.params.subscribe((params) => {
      this.store$.dispatch(new ActionPayload(CoursesActionsTypes.LOAD_COURSE, params.id));
    });
  }

  public save(): void {
    this.store$.dispatch(
      new ActionPayload(CoursesActionsTypes.UPDATE_COURSE, this.courseForm.getUpdatedCourse())
    );
    this.router.navigate(['/courses']);
  }
}
