import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { NotificationService } from '../notification/notification.service';

@Component({
  standalone:true,
  imports: [NgFor, NgIf,RouterOutlet,FormsModule,HttpClientModule ],
  selector: 'app-dashboard',
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

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    // Replace these with actual data from a service or API
    this.fetchUsers();
   
    this.notificationCount ; // Example data
    this.totalTransactions = 500; // Example data
    this.usersWaitingApproval = 5; // Example data for users waiting approval
   
  }

  fetchUsers(): void {
    // Check if we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
  
      this.http.get<any>('http://34.28.208.64:8080/kyc/admin/all-users', { headers }).subscribe(
        (response) => {
          if (response && Array.isArray(response.payload)) {
            // Capture the number of users instead of storing the users
            this.numberOfUsers = response.payload.length;
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    } else {
      console.warn('Cannot access localStorage in this environment');
    }
  }  
}
