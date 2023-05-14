import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component'; // Angular CLI environemnt
import { AuthInterceptor } from './auth-interceptor';

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
import { EmployeesEffects } from './store/employees/employees.effects';
import { PhoneFormatPipe } from './pipe/phone-format.pipe';
import { SsnFormatPipe } from './pipe/ssn-format.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalInformationComponent } from './home/employee/personal-information/personal-information.component';
import { PersonalInfomationFormComponent } from './home/employee/personal-information/personal-infomation-form/personal-infomation-form.component';
import { EmployeePersonalInfoComponent } from './home/hr/employee-profiles/employee-personal-info/employee-personal-info.component';
import { HousingDetailsComponent } from './home/employee/housing/housing-details/housing-details.component';
import { GetApplicationsEffects } from './store/applications/get-applications.effects';
import { ApplicationComponent } from './home/hr/hiring-management/application/application.component';
import { ConfirmationDialogComponent as ApplicationConfirmationDialogComponent } from './home/hr/hiring-management/application/confirmation-dialog-component/confirmation-dialog.component';
import { UpdateApplicationEffects } from './store/applications/update-application.effects';
import { OnboardingApplicationFormComponent } from './home/employee/onboarding-application/onboarding-application-form/onboarding-application-form.component';
import { GetVisaEmployeesEffects } from './store/visaEmployees/get-visa-employees.effects';
import { ConfirmationDialogComponent as VisaConfirmationDialogComponent } from './home/hr/visa-status-management/confirmation-dialog/confirmation-dialog.component';
import { UpdateVisaAuthDocEffects } from './store/visaEmployees/update-visa-auth-doc.effects';
import { HouseDetailsComponent } from './home/hr/housing-management/house-details/house-details.component';
import { ConfirmDailogComponent } from './home/employee/personal-information/confirm-dailog/confirm-dailog.component';
import { VisaStatusComponent } from './home/employee/visa-status/visa-status.component';
import { OptReceiptComponent } from './home/employee/visa-status/opt-receipt/opt-receipt.component';
import { UsernamePipe } from './pipe/username.pipe';

@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
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
    PhoneFormatPipe,
    SsnFormatPipe,
    PersonalInformationComponent,
    PersonalInfomationFormComponent,
    EmployeePersonalInfoComponent,
    HousingDetailsComponent,

    ApplicationComponent,
    ConfirmDailogComponent,
    ApplicationConfirmationDialogComponent,
    VisaConfirmationDialogComponent,
    OnboardingApplicationFormComponent,
    HouseDetailsComponent,
    VisaStatusComponent,
    OptReceiptComponent,
    UsernamePipe

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
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    EffectsModule.forRoot([LoginEffects, GetUserEffects, SignupEffects, EmployeesEffects, GetApplicationsEffects, UpdateApplicationEffects, GetVisaEmployeesEffects, UpdateVisaAuthDocEffects]),
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
