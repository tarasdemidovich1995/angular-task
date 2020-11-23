import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import * as moment from 'moment';
@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent {
  public title: string;
  public description: string;
  public duration: number;
  public creationDate: Date;
  public author: string;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) {}

  public save(): void {
    if (this.title && this.description && this.duration && this.creationDate) {
      this.coursesService.update({
        title: this.title,
        description: this.description,
        duration: this.duration,
        creationDate: moment(this.creationDate),
        id: `${Math.random()}`
      });
      this.router.navigate(['/course']);
    }
  }
}
