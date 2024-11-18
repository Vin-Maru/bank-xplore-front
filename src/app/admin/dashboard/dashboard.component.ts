import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Import the existing UserService
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports:[HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allUsers: any[] = [];
  numberOfUsers: number = 0;
  numberOfNotifications: number = 0;
  totalTransactions: number = 0;
  usersWaitingApproval: number = 0;
  notificationCount: number = 0;

  constructor(
    private userService: UserService, // Inject the existing UserService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch users using the UserService
    this.fetchUsers();
    this.pendingApproval();
   
    // Example static data for other dashboard elements
    this.notificationCount = 3;
    this.totalTransactions = 50;

  }

  // Use the UserService to fetch the users
  fetchUsers(): void {
    this.userService.fetchUsers().subscribe(
      (response) => {
        if (response && Array.isArray(response.payload)) {
          this.numberOfUsers = response.payload.length; // Set the number of users
        } else {
          console.error('Unexpected response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }



  // Method to get the count of users with 'Deactivated' status
  pendingApproval(): void {
    this.userService.fetchPendingApprovalUsers().subscribe(
      count => {
        this.pendingApproval = count;  // Set the count of pending users
        console.log('Pending Approval Users:',);
      },
      error => {
        console.error('Error fetching pending approval users:', error);
      }
    );
  }
}
