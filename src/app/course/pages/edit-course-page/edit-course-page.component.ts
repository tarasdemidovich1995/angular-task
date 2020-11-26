import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { CoursesService } from 'src/app/course/shared/services/courses.service';
import { AuthorsService } from 'src/app/course/shared/services/authors.service';

import { Author, CourseRequest } from 'src/app/interfaces';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  public course: CourseRequest;
  public isAuthorsOpen = false;
  public authorSearch = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    public authorsService: AuthorsService,
  ) {}

  public ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => this.coursesService.getById(params.id)),
      tap((course: CourseRequest) => {
        this.course = {...course, date: moment(course.date).format('YYYY-MM-DD')};
      }),
    ).subscribe({
      error: () => {
        this.router.navigate(['/courses']);
      }
    });
    if (!this.authorsService.list.length) {
      this.authorsService.update().subscribe({
        error: () => {
          this.router.navigate(['/courses']);
        }
      });
    }
  }

  public save(): void {
    this.coursesService.update(this.course).subscribe(
      () => {
        this.router.navigate(['/courses']);
      },
      () => {
        this.router.navigate(['/courses']);
      }
    );
  }

  public removeAuthor(id: string): void {
    console.log(id);
    this.course.authors = this.course.authors.filter(a => a.id !== id);
  }

  public addAuthor(author: Author): void {
    this.course.authors.push(author);
  }
}
