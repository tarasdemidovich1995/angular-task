import { Injectable } from '@angular/core';
import { CourseRequest, CoursesInfo } from '../../../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { COURSES_ON_PAGE } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  constructor(private http: HttpClient) {}


  public getCoursesCount(query: string): Observable<CoursesInfo> {
    return this.http.get<CoursesInfo>(`${environment.apiUrl}/courses/info?textFragment=${query}`)
      .pipe(delay(500));
  }

  public getList(page: number, query: string): Observable<CourseRequest[]> {
    return this.http.get<CourseRequest[]>
      (`${environment.apiUrl}/courses?start=${page * COURSES_ON_PAGE}&count=${COURSES_ON_PAGE}&textFragment=${query}`)
        .pipe(delay(500));
  }

  public create(course: CourseRequest): Observable<CourseRequest> {
    return this.http.post<CourseRequest>(`${environment.apiUrl}/courses`, course)
      .pipe(delay(500));
  }

  public getById(id: number): Observable<CourseRequest> {
    return this.http.get<CourseRequest>(`${environment.apiUrl}/courses/${id}`)
      .pipe(delay(500));
  }

  public update(course: CourseRequest): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/courses/${course.id}`, course)
      .pipe(delay(500));
  }

  public remove(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/courses/${id}`)
      .pipe(delay(500));
  }
}
