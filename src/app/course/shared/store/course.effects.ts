import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { tap, map, switchMap, withLatestFrom, catchError, concatMap, debounce, delay } from 'rxjs/operators';
import { Author, CourseRequest, CoursesInfo } from 'src/app/interfaces';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CoursesService } from '../services/courses.service';
import { CoursesActionsTypes } from './course.actions';
import { CoursesState } from './course.reducers';
import { coursesListSelector, coursesPageSelector, coursesQuerySelector } from './course.selectors';
import { ActionPayload } from 'src/app/interfaces';
import { AuthorsService } from '../services/authors.service';
import * as moment from 'moment';
import { AlertState } from 'src/app/shared/store/alert/alert.reducers';
import { AlertActionTypes } from 'src/app/shared/store/alert/alert.actions';

@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<CoursesState | AlertState>,
    private coursesService: CoursesService,
    private authorsService: AuthorsService,
    private loaderService: LoaderService,
  ) {}

  @Effect()
  public updateCount$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(CoursesActionsTypes.CHANGE_QUERY),
      switchMap(() => this.store$.pipe(select(coursesQuerySelector))),
      switchMap((query: string) => this.coursesService.getCoursesCount(query)),
      map((info: CoursesInfo) => {
        return new ActionPayload(CoursesActionsTypes.UPDATE_COUNT, info.count);
      }),
      catchError((error) => {
        this.loaderService.hideLoader();
        this.store$.dispatch(new ActionPayload(AlertActionTypes.DANGER, error.error));
        return throwError(error);
      })
    );
  }

  @Effect()
  public loadList$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(CoursesActionsTypes.CHANGE_PAGE, CoursesActionsTypes.CHANGE_QUERY),
      tap(() => this.loaderService.showLoader()),
      switchMap(() => this.store$.pipe(select(coursesQuerySelector))),
      withLatestFrom(this.store$.pipe(select(coursesPageSelector))),
      switchMap(([query, page]) => this.coursesService.getList(page, query)),
      map((courses: CourseRequest[]) => {
        return new ActionPayload(CoursesActionsTypes.UPDATE_LIST, courses);
      }),
      tap(() => this.loaderService.hideLoader()),
      catchError((error) => {
        this.loaderService.hideLoader();
        this.store$.dispatch(new ActionPayload(AlertActionTypes.DANGER, error.error));
        return throwError(error);
      })
    );
  }

  @Effect()
  public loadAuthors$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(CoursesActionsTypes.LOAD_AUTHORS),
      tap(() => this.loaderService.showLoader()),
      switchMap(() => this.authorsService.getAuthors()),
      map((authors: Author[]) => {
        return new ActionPayload(CoursesActionsTypes.UPDATE_AUTHORS, authors);
      }),
      tap(() => this.loaderService.hideLoader()),
      catchError((error) => {
        this.loaderService.hideLoader();
        this.store$.dispatch(new ActionPayload(AlertActionTypes.DANGER, error.error));
        return throwError(error);
      })
    );
  }

  @Effect()
  public deleteCourse$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(CoursesActionsTypes.DELETE_COURSE),
      delay(0),
      tap(() => this.loaderService.showLoader()),
      concatMap((
        action: ActionPayload<CoursesActionsTypes.DELETE_COURSE, number>
      ) => of(action.payload).pipe(
        withLatestFrom(this.store$.pipe(select(coursesListSelector)))
      )),
      debounce(([id, list]) => this.coursesService.remove(id)),
      map(([id, list]) => {
        return new ActionPayload(
          CoursesActionsTypes.UPDATE_LIST,
          list.filter((course) => course.id !== id)
        );
      }),
      tap(() => {
        this.loaderService.hideLoader();
        this.store$.dispatch(
          new ActionPayload(AlertActionTypes.SUCCESS, 'Course succesfully deleted')
        );
      }),
      catchError((error) => {
        this.loaderService.hideLoader();
        this.store$.dispatch(new ActionPayload(AlertActionTypes.DANGER, error.error));
        return throwError(error);
      })
    );
  }

  @Effect()
  public updateCourse$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(CoursesActionsTypes.UPDATE_COURSE),
      tap(() => this.loaderService.showLoader()),
      concatMap((
        action: ActionPayload<CoursesActionsTypes.UPDATE_COURSE, CourseRequest>
      ) => of(action.payload).pipe(
        withLatestFrom(this.store$.pipe(select(coursesListSelector)))
      )),
      debounce(([course, list]) => {
        return this.coursesService.update({...course, date: moment(course.date).toString()});
      }),
      map(([course, list]) => {
        return new ActionPayload(
          CoursesActionsTypes.UPDATE_LIST,
          [...list.filter((c) => c.id !== course.id), {...course, date: moment(course.date)}]
        );
      }),
      tap(() => {
        this.loaderService.hideLoader();
        this.store$.dispatch(
          new ActionPayload(AlertActionTypes.SUCCESS, 'Course succesfully updated')
        );
      }),
      catchError((error) => {
        this.loaderService.hideLoader();
        this.store$.dispatch(new ActionPayload(AlertActionTypes.DANGER, error.error));
        return throwError(error);
      })
    );
  }

  @Effect()
  public loadCourse$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(CoursesActionsTypes.LOAD_COURSE),
      tap(() => this.loaderService.showLoader()),
      switchMap((action: ActionPayload<CoursesActionsTypes.LOAD_COURSE, number>) => {
        return this.coursesService.getById(action.payload);
      }),
      map((course: CourseRequest) => {
        return new ActionPayload(
          CoursesActionsTypes.CHANGE_EDIT_COURSE,
          {...course, date: moment(course.date).format('YYYY-MM-DD')}
        );
      }),
      tap(() => this.loaderService.hideLoader()),
      catchError((error) => {
        this.loaderService.hideLoader();
        this.store$.dispatch(new ActionPayload(AlertActionTypes.DANGER, error.error));
        return throwError(error);
      })
    );
  }

  @Effect()
  public createCourse$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(CoursesActionsTypes.CREATE_COURSE),
      tap(() => this.loaderService.showLoader()),
      switchMap((action: ActionPayload<CoursesActionsTypes.CREATE_COURSE, CourseRequest>) => {
        return this.coursesService.create(action.payload);
      }),
      switchMap(() => this.store$.pipe(select(coursesPageSelector))),
      map((page) => {
        return new ActionPayload(CoursesActionsTypes.CHANGE_PAGE, page);
      }),
      tap(() => {
        this.store$.dispatch(
          new ActionPayload(AlertActionTypes.SUCCESS, 'Course succesfully created')
        );
      }),
      catchError((error) => {
        this.loaderService.hideLoader();
        this.store$.dispatch(new ActionPayload(AlertActionTypes.DANGER, error.error));
        return throwError(error);
      })
    );
  }
}
