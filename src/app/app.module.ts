import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FakeLogoComponent } from './components/fake-logo/fake-logo.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CreateCoursePageComponent } from './pages/create-course-page/create-course-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { EditCoursePageComponent } from './pages/edit-course-page/edit-course-page.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CourseComponent } from './components/course/course.component';
import { CourseLayoutComponent } from './components/course-layout/course-layout.component';
import { FormsModule } from '@angular/forms';
import { DateStyleDirective } from './directives/date-style.directive';
import { TransMinPipe } from './pipes/trans-min.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { RefDirective } from './directives/ref.directive';
import { MyTitleCasePipe } from './pipes/my-title-case.pipe';
import { AuthGuard } from './services/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PagesArrPipe } from './pipes/pages-arr.pipe';
import { ChipComponent } from './components/chip/chip.component';
import { AuthorsFilterPipe } from './pipes/authors-filter.pipe';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FakeLogoComponent,
    LoginPageComponent,
    CreateCoursePageComponent,
    ErrorPageComponent,
    CoursePageComponent,
    EditCoursePageComponent,
    BreadcrumbsComponent,
    CourseComponent,
    CourseLayoutComponent,
    RefDirective,
    DateStyleDirective,
    TransMinPipe,
    OrderByPipe,
    FilterPipe,
    ConfirmModalComponent,
    MyTitleCasePipe,
    AlertComponent,
    LoaderComponent,
    PaginationComponent,
    PagesArrPipe,
    ChipComponent,
    AuthorsFilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthGuard, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
