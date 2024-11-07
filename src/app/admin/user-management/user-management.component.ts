import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [NgFor, UserDetailsComponent, NgIf, RouterOutlet, FormsModule, HttpClientModule]
})
export class UserManagementComponent implements OnInit {
  allUsers: any[] = [];
  searchTerm: string = '';
  isOverlayVisible: boolean = true;
  showOverlay: boolean = true;



  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    // Check if we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');  // This line is safe now
      const headers = new HttpHeaders({
        'Authorization': `keyring_0 ${token}`,
        'Content-Type': 'application/json',
      });
  
      this.http.get<any>('http://34.28.208.64:8080/kyc/admin/all-users', { headers }).subscribe(
        (response) => {
          if (response && Array.isArray(response.payload)) {
            this.allUsers = response.payload;

          } 
          else {
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
  

  viewUserDetails(user: any): void {
    console.log('Navigating to user-details with email:', user.user.email);
    this.isOverlayVisible = false;

    this.router.navigate(['/admin/user-management/user-details', user.user.email]); // Ensure you're using the correct property
  }

  get filteredUsers() {
    if (!this.searchTerm) {
      return this.allUsers;
    }
    return this.allUsers.filter(user =>
      user.user.email.includes(this.searchTerm)
    );
  }

  closeOverlay(): void {
    this.isOverlayVisible = true; // Reset overlay visibility
    this.router.navigate(['admin/user-management']); // Navigate back to the main page
  }

}
