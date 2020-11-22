import { Component } from '@angular/core';
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

  deleteCourse(id: string): void {
    this.modal.showModal('Are you really want to delete course', () => {
      this.coursesService.remove(id);
    });
  }
}
