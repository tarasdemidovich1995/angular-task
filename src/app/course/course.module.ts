import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';

import { CourseLayoutComponent } from 'src/app/course/shared/components/course-layout/course-layout.component';
import { CoursePageComponent } from 'src/app/course/pages/course-page/course-page.component';
import { CreateCoursePageComponent } from 'src/app/course/pages/create-course-page/create-course-page.component';
import { EditCoursePageComponent } from 'src/app/course/pages/edit-course-page/edit-course-page.component';

import { CourseComponent } from 'src/app/course/shared/components/course/course.component';
import { PaginationComponent } from 'src/app/course/shared/components/pagination/pagination.component';
import { ChipComponent } from 'src/app/course/shared/components/chip/chip.component';
import { BreadcrumbsComponent } from 'src/app/course/shared/components/breadcrumbs/breadcrumbs.component';

import { DateStyleDirective } from 'src/app/course/shared/directives/date-style.directive';

import { AuthorsFilterPipe } from 'src/app/course/shared/pipes/authors-filter.pipe';
import { FilterPipe } from 'src/app/course/shared/pipes/filter.pipe';
import { MyTitleCasePipe } from 'src/app/course/shared/pipes/my-title-case.pipe';
import { OrderByPipe } from 'src/app/course/shared/pipes/order-by.pipe';
import { PagesArrPipe } from 'src/app/course/shared/pipes/pages-arr.pipe';
import { TransMinPipe } from 'src/app/course/shared/pipes/trans-min.pipe';

@NgModule({
  declarations: [
    CourseLayoutComponent,
    CoursePageComponent,
    CreateCoursePageComponent,
    EditCoursePageComponent,
    BreadcrumbsComponent,
    ChipComponent,
    CourseComponent,
    PaginationComponent,
    AuthorsFilterPipe,
    FilterPipe,
    MyTitleCasePipe,
    OrderByPipe,
    PagesArrPipe,
    TransMinPipe,
    DateStyleDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CourseLayoutComponent,
        children: [
          { path: '', component: CoursePageComponent },
          { path: 'new', component: CreateCoursePageComponent },
          { path: ':id', component: EditCoursePageComponent },
        ],
        canActivate: [AuthGuard],
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CourseModule {}
