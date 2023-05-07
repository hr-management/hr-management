import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingComponent } from './housing/housing.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  //{ path: '', component: LoginComponent },
  { path: '', component: HomeComponent },
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
