import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loadUserDetails(phone_no: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const headers = new HttpHeaders().set('Authorization', `keyring_0 ${token}`);
  
      this.http.get<any>('http://34.28.208.64:8080/kyc/admin/all-users', { headers }).subscribe(
        (data) => {
          const users = data.payload;
  
          // Find the user by matching phone number
          const userRecord = users.find((record: any) => record.user.phone_no === phone_no);
  
          if (userRecord) {
            // Set the user and documents data separately
            this.user = userRecord.user;
            this.documents = [
              { type: 'ID Document', url: userRecord.idUploadUrl },
              { type: 'KRA Document', url: userRecord.kraUploadUrl }
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
    const phone_no = this.route.snapshot.paramMap.get('phone_no');
    if (phone_no) {
      this.loadUserDetails(phone_no);
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
  
    this.http.put(`http://34.28.208.64:8080/kyc/admin/verify/${this.user.email}`, payload, { headers }).subscribe(
      () => {
        this.user.account_status = 'Approved'; // Update the user status in the UI
        console.log(`${this.user.first_name} has been approved.`);
      },
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

    this.http.delete(`http://34.28.208.64:8080/kyc/all-users/${this.user.email}`, { headers }).subscribe(
      () => console.log(`${this.user.first_name} has been declined.`),
      (error) => console.error('Error declining user:', error)
    );
  }
}
