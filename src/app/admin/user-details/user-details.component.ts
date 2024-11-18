// src/app/components/user-details/user-details.component.ts
import { Component, OnInit, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar if using Angular Material
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';
import { response } from 'express';
import { error } from 'console';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports:[CommonModule],
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
    private userService: UserService, // Inject UserService
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loadUserDetails(email: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.fetchUsers().subscribe(
        (data) => {
          const users = data.payload;
          const userRecord = users.find((record: any) => record.user.email === email);

          if (userRecord) {
            this.user = userRecord.user;
            this.documents = [
              { type: 'ID Document', url: userRecord.idImage },
              { type: 'KRA Document', url: userRecord.kraImage }
            ].filter(doc => doc.url); // Filter out any documents without a URL

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

  approveUser(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.userService.approveUser(this.user.email).subscribe(
      () => {
        this.user.account_status = 'Approved'; // Update the user status in the UI
        this.router.navigate(['admin/user-management']); 

        this.snackBar.open('User approved successfully!', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error approving user:', error);
        this.snackBar.open('Error approving user', 'Close', { duration: 3000 });
      }
    );
  }

  declineUser(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.userService.declineUser(this.user.email).subscribe(
      () => {
        this.user.account_status = 'Declined'; // Update the user status in the UI
        this.router.navigate(['admin/user-management']); 

        this.snackBar.open('User declined successfully!', 'Close', {
          duration: 3000,

        });
      },
      (error) => {
        console.error('Error declining user:', error);
        this.snackBar.open('Error declining user', 'Close', { duration: 3000 });
      }
    );
  }

  onDelete(email: string): void {
    this.userService.deleteUser(email).subscribe({
      next: (response) => {
        console.log('User deleted successfully', response);
        // Optional: Refresh the user list or display a success message
        this.router.navigate(['admin/user-management']); 
      },
      error: (error) => {
        console.error('Error in deleting user:', error);
      },
    });
  }
  

  closeOverlay(): void {
    this.close.emit(); // Emits event to close overlay if needed in parent
    this.router.navigate(['admin/user-management']); // Navigates to user management page
  }
}
