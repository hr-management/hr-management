import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component'; // Angular CLI environemnt
import { AuthInterceptor } from './auth-interceptor';
import { HousingComponent } from './housing/housing.component';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/auth/login.effects';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './home/employee/employee.component';
import { HrComponent } from './home/hr/hr.component';
import { GetUserEffects } from './store/auth/get-user.effects';
import { SignupComponent } from './signup/signup.component';
import { SignupEffects } from './store/auth/signup.effects';
import { HeaderComponent } from './home/layout/header/header.component';
import { SideBarComponent } from './home/layout/side-bar/side-bar.component';
import { EmployeeProfilesComponent } from './home/hr/employee-profiles/employee-profiles.component';
import { VisaStatusManagementComponent } from './home/hr/visa-status-management/visa-status-management.component';
import { HousingManagementComponent } from './home/hr/housing-management/housing-management.component';
import { HiringManagementComponent } from './home/hr/hiring-management/hiring-management.component';
import { OnboardingApplicationComponent } from './home/employee/onboarding-application/onboarding-application.component';

@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
    HousingComponent,
    HomeComponent,
    EmployeeComponent,
    HrComponent,
    SignupComponent,
    HeaderComponent,
    SideBarComponent,
    EmployeeProfilesComponent,
    VisaStatusManagementComponent,
    HousingManagementComponent,
    HiringManagementComponent,
    OnboardingApplicationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    EffectsModule.forRoot([LoginEffects, GetUserEffects, SignupEffects])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
