import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', loadComponent: () => import('./users.component').then(m => m.UsersComponent) },
  { path: 'medical-details', loadComponent: () => import('./medical-details.component').then(m => m.MedicalDetailsComponent) }
];
