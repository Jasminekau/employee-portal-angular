import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AuthGuard } from './services/auth.guard';

import { EmployeeMedicalComponent } from './components/employee-medical/employee-medical.component';
import { EmployeeChartsComponent } from './components/employee-charts/employee-charts.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // default: show login
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'medical', component: EmployeeMedicalComponent, canActivate: [AuthGuard] },
  { path: 'charts', component: EmployeeChartsComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }, // fallback to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
