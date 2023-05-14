import { VisaStatusComponent } from './home/employee/visa-status/visa-status.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { EmployeeProfilesComponent } from './home/hr/employee-profiles/employee-profiles.component';
import { VisaStatusManagementComponent } from './home/hr/visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './home/hr/hiring-management/hiring-management.component';
import { HousingManagementComponent } from './home/hr/housing-management/housing-management.component';
import { OnboardingApplicationComponent } from './home/employee/onboarding-application/onboarding-application.component';
import { PersonalInformationComponent } from './home/employee/personal-information/personal-information.component';
import { EmployeePersonalInfoComponent } from './home/hr/employee-profiles/employee-personal-info/employee-personal-info.component';
import { FacilityReportDetailsComponent } from './home/employee/housing/facility-report-details/facility-report-details.component';
import { FacilityReportsComponent } from './home/employee/housing/facility-reports/facility-reports.component';
import { HousingDetailsComponent } from './home/employee/housing/housing-details/housing-details.component';
import { HouseDetailsComponent } from './home/hr/housing-management/house-details/house-details.component';

import { AuthGuard } from './services/routeGuard/authRuard';
import { HRRoleGuard } from './services/routeGuard/HRRoleGuard';

const routes: Routes = [
  {

    path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'employee-profiles', canActivate: [HRRoleGuard], component: EmployeeProfilesComponent },
      { path: 'visa-status-management',canActivate: [HRRoleGuard],component: VisaStatusManagementComponent },
      { path: 'hiring-management',canActivate: [HRRoleGuard],component: HiringManagementComponent },
      { path: 'housing-management', canActivate: [HRRoleGuard],component: HousingManagementComponent },
      { path: 'house-details/:houseId', canActivate: [HRRoleGuard], component: HouseDetailsComponent },
      { path: 'onboarding-application', component: OnboardingApplicationComponent },
      { path: 'personal-information', component: PersonalInformationComponent },
      { path: 'visa-status', component: VisaStatusComponent },
      { path: 'assigned-house/:houseId', component: HousingDetailsComponent },
      { path: 'facility-reports', component: FacilityReportsComponent },
      { path: 'facility-reports/:reportId', component: FacilityReportDetailsComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employee-profiles/:id', component: EmployeePersonalInfoComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
