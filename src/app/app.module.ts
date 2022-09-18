import { HttpLoadingInterceptor } from './http-loading-interceptor';
import { GlobalErrorHandler } from './../global-error-handler';
import { UserService } from './services/user.service';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthGuard } from './services/auth-guard.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { LoginComponent } from './login/login.component';
import { NavModule } from './nav/nav.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileModule } from './profile/profile.module';
import { ProfileComponent } from './profile/profile.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProfileComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavModule,
    ProfileModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatBadgeModule
  ],
  providers: [
    AuthGuard,
    UserService,
    // {
    //   // processes all errors
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler,
    // },
    // {
    //   // interceptor to show loading spinner
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpLoadingInterceptor,
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
