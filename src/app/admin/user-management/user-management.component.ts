import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { UserDetailsComponent } from '../user-details/user-details.component'; // Import UserDetailsComponent

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class UserManagementComponent implements OnInit {
  allUsers: any[] = [];
  searchTerm: string = '';

  constructor(
    private dialog: MatDialog, // Inject MatDialog service
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.fetchUsers().subscribe(
        (response) => {
          if (response && Array.isArray(response.payload)) {
            this.allUsers = response.payload;
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }

  // Getter to filter users by phone number dynamically
  get filteredUsers() {
    if (!this.searchTerm) {
      return this.allUsers;
    }
    return this.allUsers.filter(user =>
      user.user.phone_no?.includes(this.searchTerm)
    );
  }

  // Method to open the UserDetailsComponent as a popup
  viewUserDetails(user: any): void {
    console.log('Opening UserDetails popup for:', user.user.email);

    // Open the UserDetailsComponent as a dialog
    this.dialog.open(UserDetailsComponent, {
      width: '500px', // Adjust width as needed
      data: user // Pass user data to UserDetailsComponent
    });
  }
}
