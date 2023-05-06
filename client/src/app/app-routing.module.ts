import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingComponent } from './housing/housing.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'housing', component: HousingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
