// src/app/components/add-bank/add-bank.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-bank',
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule],
  styleUrls: ['./add-bank.component.css'],
  templateUrl: './add-bank.component.html',
})
export class AddBankComponent implements OnInit {
  addBankForm!: FormGroup;

  constructor(
    private router : Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private userService:UserService // InjectUserService
  ) {}

  ngOnInit(): void {
    this.addBankForm = this.fb.group({
      first_name: ['', [Validators.required]],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_no: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bankName: ['', [Validators.required]],
    });
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
        password: this.addBankForm.get('password')?.value,
      };

      const payload = {
        userDto: userDto,
        bankName: this.addBankForm.get('bankName')?.value, // Adding bankName separately
      };

      // Call theUserService to create a bank
      this.userService.createBank(payload).subscribe(
        (response) => {
        this.router.navigate(['admin/user-management']);
          console.log('Bank created successfully:', response);
          // Show a success message
          this.snackBar.open('Bank created successfully!', 'Close', {
            duration: 3000, // Message will disappear after 3 seconds
          });

          // Clear the form
          this.addBankForm.reset();
        },
        (error) => {
          this.router.navigate(['admin/user-management']);
          console.error('Error creating bank:', error);
          this.snackBar.open('Failed to create bank. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
