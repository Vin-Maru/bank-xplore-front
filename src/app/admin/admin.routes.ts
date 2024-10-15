// src/app/admin/admin.routes.ts

// src/app/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Assuming this is your login component
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';



export const adminRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route for admin

  { path: 'login', component: LoginComponent }, // Admin login route

  { path: 'dashboard', component: DashboardComponent },    
  { path: 'user', component: UserManagementComponent }    

];



