import { Component } from '@angular/core';
import { Course } from 'src/app/interfaces';
import { ConfirmModalService } from 'src/app/services/confirm-modal.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent {
  public searchField = '';
  public filterBy = '';

  constructor(
    public coursesService: CoursesService,
    private modal: ConfirmModalService
  ) {}

  searchHandler(): void {
    this.filterBy = this.searchField;
  }

  loadHandler(): void {
    console.log('Load courses');
  }

  deleteCourse(course: Course): void {
    this.modal.showModal(
      'Delete course?',
      `Are you really want to delete ${course.title}?`,
      () => {
        this.coursesService.remove(course.id);
      }
    );
  }
}
