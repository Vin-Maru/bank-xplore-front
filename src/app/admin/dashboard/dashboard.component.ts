import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  standalone:true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  numberOfUsers: number = 0;
  numberOfNotifications: number = 0;
  totalTransactions: number = 0;
  usersWaitingApproval: number = 0;  // New property for users waiting approval

  constructor(private userService: UserService) {} // Inject UserService here

  ngOnInit() {
    // Replace these with actual data from a service or API
    this.loadUserData(); // Load user data on initialization
    this.numberOfNotifications = 10; // Example data
    this.totalTransactions = 500; // Example data
    this.usersWaitingApproval = 5; // Example data for users waiting approval
   
  }
   // Method to load user data from the API
   loadUserData() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.numberOfUsers = users.length;  // Update number of users based on API response
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
}
