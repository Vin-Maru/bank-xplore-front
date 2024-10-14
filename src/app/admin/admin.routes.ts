// src/app/admin/admin.routes.ts

import { Routes } from '@angular/router';
//import { LoginComponent } from './login/login.component'; // Adjust path as necessary
//import { DashboardComponent } from './dashboard/dashboard.component'; // Adjust path as necessary

export const adminRoutes: Routes = [
  //{ path: 'login', component: LoginComponent },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
];
