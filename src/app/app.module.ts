import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app//app.component';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';
import { ErrorPageComponent } from 'src/app/pages/error-page/error-page.component';
import { RefDirective } from 'src/app/shared/directives/ref.directive';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { AuthInterceptor } from 'src/app/shared/services/auth.interceptor';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { FakeLogoComponent } from 'src/app/shared/components/fake-logo/fake-logo.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './shared/store';
import { AlertEffects } from './shared/store/alert/alert.effects';

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
    ErrorPageComponent,
    RefDirective,
    ConfirmModalComponent,
    AlertComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AlertEffects])],
  providers: [AuthGuard, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
