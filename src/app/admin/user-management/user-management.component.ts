// src/app/user-management/user-management.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
})
export class UserManagementComponent implements OnInit {
  allUsers: any[] = [];
  searchTerm: string = '';
  isOverlayVisible: boolean = true;
  showOverlay: boolean = true;

  constructor(
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
  
  viewUserDetails(user: any): void {
    console.log('Navigating to user-details with email:', user.user.email);
    this.isOverlayVisible = false;

    this.router.navigate(['admin/user-management/user-details', user.user.email]);
  }

  closeOverlay(): void {
    this.isOverlayVisible = true;
    this.router.navigate(['admin/user-management']);
  }
}
