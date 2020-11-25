import { Injectable } from '@angular/core';
import { Course, CourseRequest, CoursesInfo } from '../interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { AlertService } from './alert.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  public list: Course[] = [];
  public page = 0;
  public coursesCount: number;
  public coursesOnPage = 4;
  public searchFragment: string;


  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  public loadPage(page: number): void {
    this.page = page;
    const sub = this.updateList().subscribe(() => {
      sub.unsubscribe();
    });
  }

  public updateState(searchFragment: string): void {
    this.searchFragment = searchFragment;
    const sub = this.updateCoursesCount().pipe(
      switchMap(() => this.updateList())
    ).subscribe(() => {
      sub.unsubscribe();
    });
  }

  public updateCoursesCount(): Observable<CoursesInfo> {
    this.loaderService.showLoader();
    return this.http.get<CoursesInfo>(`${environment.apiUrl}/courses/info?textFragment=${this.searchFragment}`)
      .pipe(
        delay(500),
        tap((info: CoursesInfo) => {
          this.coursesCount = info.count;
          this.loaderService.hideLoader();
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  public updateList(): Observable<CourseRequest[]> {
    this.loaderService.showLoader();
    return this.http.get<CourseRequest[]>(`
      ${environment.apiUrl}/courses?start=${this.page * this.coursesOnPage}&count=${this.coursesOnPage}&textFragment=${this.searchFragment}
    `).pipe(
        delay(500),
        tap((courses: CourseRequest[]) => {
          this.list = courses.map(course => ({...course, date: moment(course.date)}));
          this.loaderService.hideLoader();
        }),
        catchError(this.errorHandler.bind(this))
    );
  }

  public create(course: CourseRequest): Observable<CourseRequest> {
    this.loaderService.showLoader();
    return this.http.post<CourseRequest>(`${environment.apiUrl}/courses`, course).pipe(
      delay(500),
      tap((res: CourseRequest) => {
        this.list.push({...res, date: moment(res.date)});
        this.loaderService.hideLoader();
        this.alertService.success('Course succesfully created');
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  public getById(id: number): Observable<CourseRequest> {
    this.loaderService.showLoader();
    return this.http.get<CourseRequest>(`${environment.apiUrl}/courses/${id}`).pipe(
      delay(500),
      tap(() => {
        this.loaderService.hideLoader();
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  public update(course: CourseRequest): Observable<void> {
    this.loaderService.showLoader();
    return this.http.patch<void>(`${environment.apiUrl}/courses/${course.id}`, course).pipe(
        delay(500),
        tap(() => {
          const index = this.list.findIndex((item) => item.id === course.id);
          this.list[index] = {...course, date: moment(course.date)};
          this.loaderService.hideLoader();
          this.alertService.success('Course successfully updated');
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  public remove(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/courses/${id}`).pipe(
      delay(500),
      tap(() => {
        this.list = this.list.filter((course) => course.id !== id);
        this.alertService.success('Course succesfully removed');
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<void> {
    this.alertService.danger(error.error);
    return throwError(error);
  }
}
