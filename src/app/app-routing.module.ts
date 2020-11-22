import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseLayoutComponent } from './components/course-layout/course-layout.component';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { CreateCoursePageComponent } from './pages/create-course-page/create-course-page.component';
import { EditCoursePageComponent } from './pages/edit-course-page/edit-course-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/course', pathMatch: 'full' },
  {
    path: 'course',
    component: CourseLayoutComponent,
    children: [
      { path: '', component: CoursePageComponent },
      { path: 'create', component: CreateCoursePageComponent },
      { path: 'edit/:id', component: EditCoursePageComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
