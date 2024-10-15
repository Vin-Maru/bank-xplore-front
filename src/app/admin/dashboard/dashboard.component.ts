import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserManagementComponent } from '../user-management/user-management.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, SidebarComponent, UserManagementComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Changed styleUrl to styleUrls (plural)
})
export class DashboardComponent {
  // You can add methods or properties here if needed in the future
}
