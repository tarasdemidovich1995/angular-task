import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
