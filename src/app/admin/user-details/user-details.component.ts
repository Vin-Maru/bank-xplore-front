import { Component, OnInit, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog'; // Import MatDialogActions

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,
    CommonModule, 
    MatDialogActions,  // Ensure this is included
    MatButtonModule, 
    MatDialogContent
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any = null;
  documents: any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private userService: UserService, 
    private router: Router,
    private dialogRef: MatDialogRef<UserDetailsComponent> // Inject MatDialogRef to close the dialog
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
            ].filter(doc => doc.url); 

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
    const email = this.data.user.email;
    if (email) {
      this.loadUserDetails(email);
    }
  }

  approveUser(): void {
    this.userService.approveUser(this.user.email).subscribe(
      () => {
        this.user.account_status = 'Approved';
        this.snackBar.open('User approved successfully!', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(); // Close the dialog on success
      },
      (error) => {
        this.snackBar.open('Error approving user', 'Close', { duration: 3000 });
      }
    );
  }

  declineUser(): void {
    this.userService.declineUser(this.user.email).subscribe({
      next: () => {
        this.user.account_status = 'Declined';
        this.snackBar.open('User declined successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(); // Close the dialog on success
      },
      error: (error) => {
        this.snackBar.open('Error declining user. Please try again.', 'Close', { duration: 3000 });
      },
    });
  }
  closeOverlay(): void {
    this.dialogRef.close(); // Close the dialog using MatDialogRef
    this.router.navigate(['admin/user-management']); // Navigates to user management page if needed
  }
}
