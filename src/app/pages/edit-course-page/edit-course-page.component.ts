import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/interfaces';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  public course: Course;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course = this.coursesService.getById(params.id);
    });
  }

  public save(): void {
    this.coursesService.update(this.course);
    this.router.navigate(['/courses']);
  }

}
