import { Component } from '@angular/core';

@Component({
  selector: 'app-course-layout',
  template: `
    <app-breadcrumbs></app-breadcrumbs>
    <router-outlet></router-outlet>
  `
})
export class CourseLayoutComponent {}
