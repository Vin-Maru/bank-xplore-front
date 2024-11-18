import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LogoutComponent } from './logout/logout.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from '../auth.guard';
import { ViewBanksComponent } from './viewbank/viewbank.component';


export const adminRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Default route

  { path: 'login', component: LoginComponent},  // Login route
  
  {
    path: '',  // Empty path to indicate admin base
    component: AdminComponent,  // Admin layout wrapper
    children: [
      { path: 'dashboard', component: DashboardComponent},  // Protect this route with authGuard
      { 
        path: 'user-management', 
        component: UserManagementComponent,
        children: [
          { path: 'user-details/:email', component: UserDetailsComponent },
        ]
      },  // Protect this route with authGuard
      { path: 'transaction', component: TransactionComponent,},  // Protect this route with authGuard
      { path: 'logout', component: LogoutComponent,},  // Protect this route with authGuard
      { path: 'add-bank', component: AddBankComponent,},
      {path: 'view-banks', component: ViewBanksComponent}
    ]
  }
];
