import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [NgFor, NgIf, FormsModule, RouterOutlet, HttpClientModule]
})
export class UserManagementComponent implements OnInit {
  allUsers: any[] = [];  // Initially empty, will be filled with API data
  searchTerm: string = ''; // Declare searchTerm property

  constructor(private http: HttpClient) { } // Inject HttpClient

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = localStorage.getItem('authToken'); // Get the token from local storage

    const headers = new HttpHeaders({
      'Authorization': `keyring_0 ${token}`, // Include the token in the Authorization header
      'Content-Type': 'application/json',
    });

    this.http.get<any>('http://172.179.51.100:8080/kyc/all-users', { headers }).subscribe(
      (response) => {
        if (response && Array.isArray(response.payload)) {
          this.allUsers = response.payload; // Correctly assign the payload to allUsers
          this.allUsers.forEach(user => {
            if(user.email){this.fetchUserDocuments(user.email);
            }
            else {
              console.error('Email is missing for user:', user);
            }
          });
        } else {
          console.error('Unexpected response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchUserDocuments(email: string): void {
    // Fetch documents without token validation
    this.http.get<any>(`http://172.179.51.100:8080/kyc/admin/all-users`).subscribe(
      (response) => {
        if (response && response.documents) {
          const user = this.allUsers.find(u => u.email === email); // Find the user by email
          if (user) {
            user.documents = response.documents; // Attach documents to the user object
          }
        } else {
          console.error('No documents found for the user:', email);
        }
      },
      (error) => {
        console.error('Error fetching documents for user:', error);
      }
    );
}


  get filteredUsers() {
    if (!this.searchTerm) {
      return this.allUsers; // Return all users if no search term is provided
    }
    return this.allUsers.filter(user => 
      user.phone_no.includes(this.searchTerm) // Adjust this based on your needs
    );
  }

  approveUser(user: any) {
    const token = localStorage.getItem('authToken'); // Get the token from local storage

    const headers = new HttpHeaders({
      'Authorization': `keyring_0 ${token}`, // Include the token in the Authorization header
      'Content-Type': 'application/json',
    });

    this.http.put(`http://172.179.51.100:8080/kyc/all-users/${user.user_id}`, { status: 'Logged In' }, { headers }).subscribe(
      (response) => {
        user.account_status = 'Logged In';
        console.log(`${user.first_name} has been approved.`);
      },
      (error) => {
        console.error('Error approving user:', error);
      }
    );
  }

  declineUser(user: any) {
    const token = localStorage.getItem('authToken'); // Get the token from local storage

    const headers = new HttpHeaders({
      'Authorization': `keyring_0 ${token}`, // Include the token in the Authorization header
      'Content-Type': 'application/json',
    });

    this.http.delete(`http://172.179.51.100:8080/kyc/all-users/${user.user_id}`, { headers }).subscribe(
      (response) => {
        const index = this.allUsers.indexOf(user);
        if (index > -1) {
          this.allUsers.splice(index, 1); // Remove the user from the list
          console.log(`${user.first_name} has been declined.`);
        }
      },
      (error) => {
        console.error('Error declining user:', error);
      }
    );
  }
}
