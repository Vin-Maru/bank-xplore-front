import { Component } from '@angular/core';
import { UserManagementComponent } from '../user-management/user-management.component';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
