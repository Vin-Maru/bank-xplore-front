import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to HomeComponent when the app starts
  { path: 'home', component: HomeComponent }, // Define the route for HomeComponent
  // You can add other routes here as needed
];
