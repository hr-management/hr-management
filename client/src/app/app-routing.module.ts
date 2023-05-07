import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingComponent } from './housing/housing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { EmployeeProfilesComponent } from './home/hr/employee-profiles/employee-profiles.component';
import { VisaStatusManagementComponent } from './home/hr/visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './home/hr/hiring-management/hiring-management.component';
import { HousingManagementComponent } from './home/hr/housing-management/housing-management.component';
import { OnboardingApplicationComponent } from './home/employee/onboarding-application/onboarding-application.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'employee-profiles', component: EmployeeProfilesComponent },
      { path: 'visa-status-management', component: VisaStatusManagementComponent },
      { path: 'hiring-management', component: HiringManagementComponent },
      { path: 'housing-management', component: HousingManagementComponent },
      { path: 'onboarding-application', component: OnboardingApplicationComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
  { path: 'housing', component: HousingComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
