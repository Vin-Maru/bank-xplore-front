import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Import the existing UserService
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allUsers: any[] = [];
  numberOfUsers:number | null = null;
  numberOfNotifications: number = 0;
  totalTransactions:number | null = null;
  pendingApproval: number | null = null; // For displaying pending approvals count
  notificationCount: number | null = null;

  constructor(
    private userService: UserService, // Inject the existing UserService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers(); // Fetch total users
    this.loadPendingApproval(); // Fetch pending approvals
    this.fetchTotalTransactions();
    // Example static data for other dashboard elements
   
  }

  // Fetch all users and set their count
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

  // Fetch count of pending approval users
  loadPendingApproval(): void {
    this.userService.fetchPendingApprovalUsers().subscribe(
      (count) => {
        this.pendingApproval = count; // Set the count of pending users
        console.log('Pending Approval Users:', count);
      },
      (error) => {
        console.error('Error fetching pending approval users:', error);
      }
    );
  }
  fetchTotalTransactions(): void {
    this.userService.totalTransactions().subscribe(
      (count: number) => {
        this.totalTransactions = count;
      },
      (error) => {
        console.error('Error fetching total transactions:', error);
      }
    );
  }
}
