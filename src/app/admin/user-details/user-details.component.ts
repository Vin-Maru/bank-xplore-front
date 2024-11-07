import { Component, OnInit, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar if using Angular Material


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any = null;
  documents: any = null;
  @Output() close = new EventEmitter<void>();


  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loadUserDetails(email: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const headers = new HttpHeaders().set('Authorization', `keyring_0 ${token}`);
  
      this.http.get<any>('http://34.28.208.64:8080/kyc/admin/all-users', { headers }).subscribe(
        (data) => {
          const users = data.payload;
  
          // Find the user by matching phone number
          const userRecord = users.find((record: any) => record.user.email === email);
  
          if (userRecord) {
            // Set the user and documents data separately
            this.user = userRecord.user;
            this.documents = [
              { type: 'ID Document', url: userRecord.idImage },
              { type: 'KRA Document', url: userRecord.kraImage }
            ].filter(doc => doc.url); // Filter out any entries without a URL
  
            console.log('User details loaded:', this.user);
            console.log('Document details loaded:', this.documents);
          } else {
            console.error('User not found.');
          }
        },
        (error) => console.error('Error fetching user details:', error)
      );
    } else {
      console.error('localStorage is not available on the server.');
    }
  }
  
  
  
  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.loadUserDetails(email);
    }
  }

  approveUser() {
    if (!isPlatformBrowser(this.platformId)) return;
  
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `keyring_0 ${token}`,
      'Content-Type': 'application/json',
    });
  
    // Prepare the request payload
    const payload = {
      email: this.user.email,
      verified: true, // Set verified to true to approve the user
    };
  
    this.http.post(`http://34.28.208.64:8080/kyc/admin/verify`, payload, { headers }).subscribe(
      () => {
        this.user.account_status = 'Approved'; // Update the user status in the UI

        console.log(`${this.user.first_name} has been approved.`);

        this.snackBar.open('Approved successfully!', 'Close'),{
          duration: 3000, // Message will disappear after 3 seconds
        
      }},
      (error) => console.error('Error approving user:', error)
    );
  }
  
  declineUser() {
    if (!isPlatformBrowser(this.platformId)) return;
  
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `keyring_0 ${token}`,
      'Content-Type': 'application/json',
    });
  
    // Prepare the request payload
    const payload = {
      email: this.user.email,
      verified: false, // Set verified to true to approve the user
    };
  
    this.http.post(`http://34.28.208.64:8080/kyc/admin/verify`, payload, { headers }).subscribe(
      () => {
        this.user.account_status = 'Declined'; // Update the user status in the UI
        console.log(`${this.user.first_name} Documents Declined.`);
      },
      (error) => console.error('Error declining user:', error)
    );
  }

  closeOverlay() {
    this.close.emit(); // Emits event to close overlay if needed in parent
    this.router.navigate(['admin/user-management']); // Navigates to user management page
  }
}
