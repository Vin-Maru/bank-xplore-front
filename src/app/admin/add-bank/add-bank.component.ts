import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar if using Angular Material


@Component({
  selector: 'app-add-bank',
  standalone: true,
  styleUrls: ['./add-bank.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule,
    RouterOutlet
  ],
  templateUrl: './add-bank.component.html',
})
export class AddBankComponent implements OnInit {
  addBankForm !: FormGroup;

  constructor( private snackBar: MatSnackBar, private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.addBankForm = this.fb.group({
      first_name: ['', [Validators.required]],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_no: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bankName:['', [Validators.required]],

    }
  );
  }

  onSubmit(): void {
    if (this.addBankForm.valid) {
      // Prepare the payload
      const userDto = {
        first_name: this.addBankForm.get('first_name')?.value,
       middle_name: this.addBankForm.get('middle_name')?.value,
        last_name: this.addBankForm.get('last_name')?.value,
        email: this.addBankForm.get('email')?.value,
        phone_no: this.addBankForm.get('phone_no')?.value,
        password: this.addBankForm.get('password')?.value
      };

      const payload = {
        userDto: userDto,
        bankName: this.addBankForm.get('bankName')?.value // Adding bankName separately
      };

      // Send the payload to the backend
      this.http.post<any>('http://34.28.208.64:8080/kyc/admin/create-bank', payload)
        .subscribe({
          next: (response) => {
            console.log('Bank created successfully:', response);
          // Show a success message
          this.snackBar.open('Bank created successfully!', 'Close', {
            duration: 3000, // Message will disappear after 3 seconds
          });

          // Clear the form
          this.addBankForm.reset();
          },
          error: (error) => {
            console.error('Error creating bank:', error);
            this.snackBar.open('Failed to create bank. Please try again.', 'Close', {
              duration: 3000,
            });
          }
        });
    }
  }
}
